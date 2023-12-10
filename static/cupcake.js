$('.delete-cupcake').click(deleteCupcake)

async function deleteCupcake() {
    const id = $(this).data('id')
    await axios.delete(`/api/cupcakes/${id}`)
    $(this).parent().remove()
}

$('#add-btn').click(function (event) {
    event.preventDefault();
    addCupcake();
});

async function addCupcake(event) {
    event.preventDefault();
    console.log('clicked');
    const flavor = $('#flavor').val();
    const size = $('#size').val();
    const rating = $('#rating').val();
    // let image = $('#image').val();

    // if (!image) {
    //     image = 'https://tinyurl.com/demo-cupcake';
    // }
    const image = 'https://tinyurl.com/demo-cupcake';

    const cupcakeData = {
        flavor: flavor,
        size: size,
        rating: rating,
        image: image
    };
    const response = await axios.post('/api/cupcakes', cupcakeData);
    const newCupcake = response.data.cupcake;

    const cupcakeList = $('.cupcake-list');
    const newCupcakeItem = $('<li>').text(`${flavor} - ${size}`);
    const ratingItem = $('<p>').text(`Rating: ${rating}`);
    const imageItem = $('<img>').attr('src', image);
    const deleteButton = $('<button>').addClass('delete-cupcake').text('X').data('id', newCupcake.id);

    newCupcakeItem.append(ratingItem, imageItem, deleteButton);
    cupcakeList.append(newCupcakeItem);

    // Clear the input fields
    $('#flavor').val('');
    $('#size').val('');
    $('#rating').val('');
    $('#image').val('');
}

async function addToDb(cupcakeData) {
    await axios.post('/api/cupcakes', cupcakeData);
}
