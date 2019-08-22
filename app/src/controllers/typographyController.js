global.server.app.get(['/typography'], function (req, res) {
    res.render("typography", { products: [{ title: 'holaa', img: 'https://i.kym-cdn.com/entries/icons/original/000/016/546/hidethepainharold.jpg' }, { title: 'holaa2', img: 'https://fsmedia.imgix.net/43/e9/9e/ac/0c64/4d0e/a2bc/dda1d61a31db/on-fire.jpeg' }] });
    res.end();
});