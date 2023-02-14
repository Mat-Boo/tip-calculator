const billPrice = document.querySelector('#billPrice');
const nbPeople = document.querySelector('#nbPeople');
const tips = document.querySelectorAll('.tip');
const tipCustom = document.querySelector('.tipCustom');
const tipAmount = document.querySelector('.tipAmount');
const total = document.querySelector('.total');
const resetBtn = document.querySelector('#resetBtn');
const customInput = document.querySelector('#customInput');
let tip = null;

const refreshResults = () => {
    if (billPrice.value != '' && nbPeople.value != '') {        
        tipAmount.innerText = new Intl.NumberFormat('fr-FR', {style: 'currency',currency: 'EUR', minimumFractionDigits: 2}).format((parseInt(tip) * billPrice.value / 100) / parseInt(nbPeople.value));
        total.innerText = new Intl.NumberFormat('fr-FR', {style: 'currency',currency: 'EUR', minimumFractionDigits: 2}).format((parseInt(billPrice.value) + (parseInt(tip) * billPrice.value / 100)) / parseInt(nbPeople.value));        
    };
};

const calculateTip = () => {
    tips.forEach((item) => {
        item.addEventListener('click', (e) => {
            tips.forEach((i) => {
                i.classList.remove('pushTip');
                customInput.classList.remove('pushTipCustom');
            });
            item.classList.add('pushTip');
            console.log(customInput.value);
            if (item.id === 'custom') {
                customInput.addEventListener('focus', () => {
                    tip = 0;
                    refreshResults();
                });
                customInput.classList.add('pushTipCustom');
                customInput.addEventListener('keyup', () => {
                    tip = customInput.value
                    refreshResults();
                });
            } else {
                customInput.value = '';
                tip = e.target.id;
                refreshResults();
            };
        });
    });
}

calculateTip();
billPrice.addEventListener('keyup', refreshResults);
nbPeople.addEventListener('keyup', refreshResults);

resetBtn.addEventListener('click', () => {
    tips.forEach((i) => {
        i.classList.remove('pushTip');
    });
    billPrice.value = '';
    customInput.value = '';
    nbPeople.value = '';
    tipAmount.innerText = '0 €';
    total.innerText = '0 €';
    tip = null;
});

