class Response
{
    constructor(status,data)
    {
        this.status=status
        this.length=data.length
        this.data={data}
    }
}
module.exports=Response