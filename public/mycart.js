$(()=>{
    var currVendor;
    function refreshList(){
        $.get('/cart',(data)=>{
            $('#productList').empty()
            $('#productList').append(
                `<tr>
                <th>S No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product Price</th>
                <th>Net Price</th>
                </tr>`
            )
            var net = 0
            var count = 1;
            for(let item of data){
                net = item.product.price*item.qty
                $('#productList').append(
                    `<tr>
                    <td align=center>${count}</td>
                    <td align=center>${item.product.name}</td>
                    <td align=center>${item.qty}</td>
                    <td align=center>Rs. ${item.product.price}</td>
                    <td align=center>Rs. ${net}</td>
                    </tr>`
                )
                count++;
            }
        })
    } 

    function getTotal(){
        $.get('/cartTotal',(data)=>{
            $('#total').empty()
                if(data.total==undefined){
                    alert('Please Login First')
                }
                $('#total').append(
                    `${data.total}`)
                  
            
            
        })
    }

    refreshList()
    getTotal()
    

})