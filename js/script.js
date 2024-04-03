'use strict';

function toggleBurgerMenu() {
    if (document.getElementById('header-menu').classList.contains('header__menu--flex')) {
        document.getElementById('header-menu').classList.remove('header__menu--flex');
    } else {
        document.getElementById('header-menu').classList.add('header__menu--flex');
    }
}

function showPopup(popup) {
    popup.hidden = false;
    setTimeout(() => {
        popup.hidden = true;
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenuButton = document.getElementById('burger_menu_button');
    burgerMenuButton.addEventListener('click', toggleBurgerMenu);

    const form = document.getElementById('order-form');
    const popup = document.getElementById('popup');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const requestData = Object.fromEntries(formData.entries());

        fetch('http://somewhere', {
            method: 'POST',
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (response.ok) {
                    showPopup(popup);
                }
            })
            .catch(error => {
                showPopup(popup);
            });
    });

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    nameInput.addEventListener('input', function(event) {
        event.target.value = event.target.value.replace(/\./g, '');
    });

    phoneInput.addEventListener('input', function(event) {
        const inputValue = event.target.value;
        if (inputValue.length === 1 && inputValue !== '+') {
            event.target.value = '';
        } else {
            event.target.value = inputValue.replace(/[^0-9+]/g, '');
        }
    });

    new WOW().init();
});
