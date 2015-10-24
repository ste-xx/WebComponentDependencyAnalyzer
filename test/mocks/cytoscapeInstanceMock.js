define([], function () {
    return {
        data:(function(){
           return {
             nodes:[],
             edges:[]
           }
        })(),
        add:function(element){
            if(element.group === "nodes"){
                this.data.nodes.push(element.data.id);
            }else if(element.group === "edges"){
                this.data.edges.push({
                    from: element.data.source,
                    to:element.data.target
                });
            }
            else{
                throw "mock supports only nodes and edges"
            }
        },
        json:function(){
            return this.data;
        }
    };
});