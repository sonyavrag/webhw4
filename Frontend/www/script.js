const pizzaInfo = [
    {
        id: 1,
        icon: 'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'meat',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 99
        },
        big_size: {
            weight: 660,
            size: 40,
            price: 169
        }
    },
    {
        id: 2,
        icon: 'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'meat',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size: {
            weight: 460,
            size: 30,
            price: 139
        },
        big_size: {
            weight: 840,
            size: 40,
            price: 199
        }
    },
    {
        id: 3,
        icon: 'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'meat',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size: {
            weight: 430,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id: 4,
        icon: 'assets/images/pizza_5.jpg',
        title: "Сициліано",
        type: 'meat',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський', 'соус томатний']
        },
        small_size: {
            weight: 450,
            size: 30,
            price: 111
        },
        big_size: {
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id: 17,
        icon: 'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'vega',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id: 43,
        icon: 'assets/images/pizza_6.jpg',
        title: "Мікс смаків",
        type: 'meat',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size: {
            weight: 470,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id: 90,
        icon: 'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'seafood',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size: {
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id: 6,
        icon: 'assets/images/pizza_4.jpg',
        title: "Россо Густо",
        type: 'seafood',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size: {
            weight: 400,
            size: 30,
            price: 189
        },
        big_size: {
            weight: 700,
            size: 40,
            price: 299
        }
    }
];
const typeTranslations = {
    meat: 'М’ясна піца',
    vega: 'Вега піца',
    seafood: 'Морська піца',
};


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateOrderPanel() {
    const orderPanel = document.getElementById('order-panel');
    const orderItemsContainer = orderPanel.querySelector('.order-items');
    const totalAmount = orderPanel.querySelector('.total-amount');
    const orderCount = orderPanel.querySelector('.order-count');

    orderItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const pizza = pizzaInfo.find(p => p.id === item.id);
        const pizzaSize = item.size === 'small' ? pizza.small_size : pizza.big_size;
        total += pizzaSize.price * item.quantity;

        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <div class="item-details">
                <span class="item-name">${pizza.title} (${item.size === 'small' ? 'Мала' : 'Велика'})</span>
                <div class="item-size-weight">
                    <span class="item-size">
                        <img src="assets/images/size-icon.svg" alt="size icon" class="icon">${pizzaSize.size}
                    </span>
                    <span class="item-weight">
                        <img src="assets/images/weight.svg" alt="weight icon" class="icon">${pizzaSize.weight}
                    </span>
                </div>
                <span class="item-price">${pizzaSize.price * item.quantity} грн</span>
            </div>
            <div class="item-quantity">
                <button class="quantity-button minus" onclick="changeQuantity(${item.id}, '${item.size}', -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-button plus" onclick="changeQuantity(${item.id}, '${item.size}', 1)">+</button>
                <button class="remove-button" onclick="removeFromCart(${item.id}, '${item.size}')">×</button>
                <img src="${pizza.icon}" alt="${pizza.title}" class="order-image">
            </div>
        `;

        orderItemsContainer.appendChild(orderItem);
    });

    totalAmount.textContent = `${total} грн`;
    orderCount.textContent = cart.length;
}

function changeQuantity(id, size, delta) {
    const item = cart.find(i => i.id === id && i.size === size);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id || i.size !== size);
        }
    }
    saveCart();
    updateOrderPanel();
}

function removeFromCart(id, size) {
    cart = cart.filter(i => i.id !== id || i.size !== size);
    saveCart();
    updateOrderPanel();
}

function clearOrder() {
    cart = [];
    saveCart();
    updateOrderPanel();
}

document.querySelector('.clear-order').addEventListener('click', clearOrder);

function addToCart(id, size) {
    const item = cart.find(i => i.id === id && i.size === size);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, size, quantity: 1 });
    }
    saveCart();
    updateOrderPanel();
}

function filterPizzas(type) {
    let filteredPizzas;
    if (type === 'all') {
        filteredPizzas = pizzaInfo;
    } else if (type === 'pineapple') {
        filteredPizzas = pizzaInfo.filter(pizza => pizza.content.pineapple && pizza.content.pineapple.length > 0);
    } else if (type === 'mushroom') {
        filteredPizzas = pizzaInfo.filter(pizza => pizza.content.mushroom && pizza.content.mushroom.length > 0);
    } else {
        filteredPizzas = pizzaInfo.filter(pizza => pizza.type.toLowerCase() === type);
    }
    renderPizzas(filteredPizzas);

}

function renderPizzas(pizzas) {
    const container = document.getElementById('pizza-container');
    const pizzaCount = document.querySelector('.pizza-count')
    pizzaCount.textContent = pizzas.length;
    container.innerHTML = '';

    pizzas.forEach(pizza => {
        const contentDescription = Object.values(pizza.content).flat().join(', ');
        const translatedType = typeTranslations[pizza.type] || pizza.type;

        const pizzaCard = document.createElement('div');
        pizzaCard.classList.add('pizza-card');
        pizzaCard.innerHTML = `
            <img src="${pizza.icon}" alt="${pizza.title}">
            <div class="pizza-info">
                <h2 class="title">${pizza.title}</h2>
                <p class="subtitle">${translatedType}</p>
                <p class="description">${contentDescription}</p>
                <div class="sizes">
                    ${pizza.small_size ? `
                    <div class="size">
                        <span class="size-detail">
                            <img src="assets/images/size-icon.svg" class="icon" alt="size icon">${pizza.small_size.size}
                        </span>
                        <span class="size-detail">
                            <img src="assets/images/weight.svg" class="icon" alt="weight icon">${pizza.small_size.weight}
                        </span>
                        <div class="price">
                            <span>${pizza.small_size.price}</span>
                            <span class="currency">грн</span>
                        </div>
                        <button class="buy-button" onclick="addToCart(${pizza.id}, 'small')">Купити</button>
                    </div>` : ''}
                    ${pizza.big_size ? `
                    <div class="size">
                        <span class="size-detail">
                            <img src="assets/images/size-icon.svg" class="icon" alt="size icon">${pizza.big_size.size}
                        </span>
                        <span class="size-detail">
                            <img src="assets/images/weight.svg" class="icon" alt="weight icon">${pizza.big_size.weight}
                        </span>
                        <div class="price">
                            <span>${pizza.big_size.price}</span>
                            <span class="currency">грн</span>
                        </div>
                        <button class="buy-button" onclick="addToCart(${pizza.id}, 'big')">Купити</button>
                    </div>` : ''}
                </div>
            </div>
        `;
        container.appendChild(pizzaCard);
    });
}

document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function () {
        const type = this.classList.contains('all') ? 'all' : this.classList[1];
        filterPizzas(type);
        document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
    });
});

window.onload = () => {
    renderPizzas(pizzaInfo);
    updateOrderPanel();
};