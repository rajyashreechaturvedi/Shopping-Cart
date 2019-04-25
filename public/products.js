
$(()=>{
    var currVendor;
    
    
    function getOptions(){
        $.get('/vendor',(data)=>{
            $('#taskList').empty()

            //data.sort((a,b) => a.priority - b.priority)

            for(let vendor of data){
                $('#vendorOptions').append(
                    `<option value="${vendor.id}">${vendor.name}</option>`
                )
            }
        })
    } 

    refreshList()
    getOptions()
    var x;
    $("#vendorOptions").change(function(){
        
      x = $('#vendorOptions option:selected').val();
       // x =  document.getElementById("#vendorOptions optio").value;
        console.log('the final value is = '+ x)
       });
    $('#addProduct').click(()=>{
        $.post(
            '/product',
            {
                name: $('#name').val(),
                price: $('#price').val(),
                vendor: $('#vendorOptions option:selected').text(),
                qty: $('#qty').val(),
                vendorId: $('#vendorOptions option:selected').val()
            },
            (data)=>{
                if(data.success){
                    refreshList()
                }
            }
        )
    })

})

function refreshList(){
    $.get('/product',(data)=>{
        $('#productList').empty()
        var count = 1;
            $('#productList').append(
                `<tr>
                <th>S No.</th>
                <th>Product Name</th>
                <th>Vendor Name</th>
                <th>Price</th>
                <th>Delete</th>
                </tr>`
            )
        for(let product of data){
            $('#productList').append(
                `<tr>
                <td align=center>${count}</td>
                <td align=center>${product.name}</td>
                <td align=center>${product.vendor}</td>
                <td align=center>${product.price}</td>
                <td align=center><button onclick="deleteProduct(${product.id})">Delete</button></td>
                </tr>`
            )
            count++;
        }
    })
} 

function deleteProduct(id){
    $.ajax({
        url : '/product/'+id,
        type: 'DELETE',
        success: function(result) {
            console.log(result.success)
            if(result.success){
                
                refreshList()
            }
        }
    })
}