var curruser
$(()=>{
    
    checkLogin()
    //refreshList()
    function refreshList(){
        $.get('/product',(data)=>{
            $('#products').empty()
            $('#products').append(
                `<tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Add to Cart</th>
                </tr>`
            )
            for(let product of data){
                $('#products').append(
                    `<tr>
                    <td align=center>${product.name}</td>
                    <td align=center>Rs. ${product.price}</td>
                    <td align=center><button onclick="$.post('/cart',{
                        qty:${1},
                        productId:${product.id}
                    })">Add To Cart</button></td>
                    </tr>`
                )
            }
        })
    } 
    
    $('#checkUser').click(()=>{
        $.post(
            '/checkUser',
            {
                username: $('#name').val()
            },
            (data)=>{
                console.log(data)
                curruser = data.username
                refreshList()
                checkLogin()
            }
        )
    })
    $('#logout').click(()=>{
        $.post(
            '/logout',
            (data)=>{
                if(data.success){
                    checkLogin()
                }
            }
        )
    })

    function checkLogin(){
    
        $.get('/login',(data)=>{
            if(data.success){
                $('#form1').hide()
                $('#form2').show()
                $('#products').show()
                $('#goto_cart').show()
                refreshList()
                console.log(data.message)
                if(data.message!=null){
                    $('#msg').text("Welcome "+data.message)
                }
                
            }
            else{
                $('#form1').show()
                $('#form2').hide()
                $('#products').hide()
                $('#goto_cart').hide()
            }
        })
    }

})

