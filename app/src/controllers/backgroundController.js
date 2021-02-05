const db = global.db;

global.server.app.get(['/background/:orderId'], (req, res) => {
    var orderId = req.params.orderId;
    db.Order.findOne({ 
        where: { hash: orderId },
        include: [db.Product]
    }).then(async order => {
        if (!order) {
            res.redirect('/');
        }
        if (order.Product.acceptedPhotos == 0) {
            await setEmptyVariations(order);
            return res.redirect(`/customer_info/${order.hash}`);
        }
        db.Variation.findAll({ where: { type: 'background' } }).then(backgrounds => {
            res.render("background", { backgrounds: orderBackgrounds(backgrounds), order: order });
            res.end();
        })
    });
});

async function setEmptyVariations(order) {
    await order.setBackground(await db.Variation.findOne({
        where: {
            emptyOption: true,
            type: 'background'
        }
    }));
    let typography = await db.Variation.findOne({
        where: {
            emptyOption: true,
            type: 'typography'
        }
    });
    // if (order.Text) {
    //     await order.Text.update({ value: '', TypographyId: typography.id });
    // } else {
    //     let text = await db.Text.create({ value: '', TypographyId: typography.id });
    //     await order.setText(text);
    // }

    let text = await db.Text.create({ value: '', TypographyId: typography.id });
    await order.setText(text);
}

function orderBackgrounds(backgrounds) {
    return backgrounds.sort(function (b1, b2) {
        return `${b1.name}0`.match(/\d+/)[0] - `${b2.name}0`.match(/\d+/)[0]
    })
}