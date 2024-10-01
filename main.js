(async function play() {
    const field_selector = '._field_ljr7a_1._field_5u0tl_52';
    const card_selector = '._card_hqw8n_1';
    let final_array = [];

    console.log('Пошел процесс', field_selector);
    let field = document.querySelector(field_selector);
    if (field) {
        console.log('Поле найдено', field);
        let cards = document.querySelectorAll(card_selector);
        let i = 0;
        cards.forEach(card => {
            final_array.push({
                card: card,
                opened: false,
                img_url: null,
                img_alt: null,
                card_index: i,
            });

            i += 1;
        })

        console.log('Карточки инициализированы', cards);

        for (let i = 0; i < final_array.length; i++) {
            final_array[i].card.click();
            console.log('Обрабатываем карточку', final_array[i]);
            while (true) {
                let child_img = final_array[i].card.querySelector('img')
                if (child_img) {
                    final_array[i].img_url = child_img.currentSrc;
                    final_array[i].img_alt = child_img.alt;
                    console.log('Изображение установлено', final_array[i]);
                    if (i % 2 !== 0 && final_array[i].img_url === final_array[i - 1].img_url) {
                        final_array[i].opened = true;
                        final_array[i - 1].opened = true;
                        console.log('Внезапно совпало с', final_array[i-1]);
                    }

                    await new Promise((resolve) => setTimeout(resolve, 3500));
                    break;
                }

                await new Promise((resolve) => setTimeout(resolve, 200));
            }
        }

        console.log('Обработанный массив', final_array);

        for (let i = 0; i < final_array.length - 1; i++) {
            console.log('Ищем совпадения для ', final_array[i]);
            if (final_array[i].opened) {
                console.log('Карточка уже была открыта', final_array[i]);
                continue;
            }

            for (let j = i + 1; j < final_array.length - 1; j++) {
                if (final_array[j].img_url === final_array[i].img_url) {
                    console.log('Совпала с', final_array[j]);
                    final_array[i].card.click();
                    await new Promise((resolve) => setTimeout(resolve, 3500));
                    final_array[j].card.click();
                    await new Promise((resolve) => setTimeout(resolve, 3500));
                    final_array[i].opened = true;
                    final_array[j].opened = true;
                    break;
                }
            }
        }

        console.log('Открытый массив', final_array);
    } else {
        console.log('Поле не найдено');
        return 'yes';
    }

    return 'no';
})();