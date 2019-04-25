$(()=>{
    var currVendor;
    

    refreshList()
    $('#addVendor').click(()=>{
        $.post(
            '/vendor',
            {
                name: $('#name').val(),
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
    $.get('/vendor',(data)=>{
        $('#vendorList').empty()
        $('#vendorList').empty()
            $('#vendorList').append(
                `<tr>
                <th>Sno.</th>
                <th>Vendor Name</th>
                <th>Delete</th>
                </tr>`
            )
        var count = 1;
        for(let vendor of data){
            $('#vendorList').append(
                `<tr>
                <td align=center>${count}</td>
                <td align=center>${vendor.name}</td>
                <td align=center><button onclick="deleteVendor(${vendor.id})">Delete</button></td>
              </tr>`
              
            )
            count++;
        }
    })
} 

function deleteVendor(id){
    $.ajax({
        url : '/vendor/'+id,
        type: 'DELETE',
        success: function(result) {
            console.log(result.success)
            if(result.success){
                
               refreshList()
            }
        }
    })
}