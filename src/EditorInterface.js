var EditorInterface = (function(  ) {
    var settings = {
        editoraddr:'http://localhost:8080/entities',
    };

    return {
        addModel: function( data, socket ) {
            var msg = {
                name : data.name,
                model_id : parseInt(data.model_id),
                translation : {
                    x : parseInt(data.tx),
                    y : parseInt(data.ty),
                    z : parseInt(data.tz),
                },
                rotation_axis : {
                    x : parseInt(data.rx),
                    y : parseInt(data.ry),
                    z : parseInt(data.rz),                                        
                },
                scale : {
                    x : parseInt(data.sx),
                    y : parseInt(data.sy),
                    z : parseInt(data.sz),                                        
                }
            }

            socket.send( JSON.stringify(msg) );
        },

        editModel: function( data, socket ) {
            var msg = {
                entity_id : data.entity_id,
                name : data.name,
                model_id : parseInt(data.model_id),
                translation : {
                    x : parseInt(data.tx),
                    y : parseInt(data.ty),
                    z : parseInt(data.tz),
                },
                rotation_axis : {
                    x : parseInt(data.rx),
                    y : parseInt(data.ry),
                    z : parseInt(data.rz),                                        
                },
                scale : {
                    x : parseInt(data.sx),
                    y : parseInt(data.sy),
                    z : parseInt(data.sz),                                        
                }
            }

            socket.send( JSON.stringify(msg) );
        }
    };

})();

export default EditorInterface;