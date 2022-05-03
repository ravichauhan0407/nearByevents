
export const localDate=(epoch)=>
{
    var myDate = new Date(parseInt(epoch));
    return myDate.toLocaleString();
}