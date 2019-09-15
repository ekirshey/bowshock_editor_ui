var EditorInterface = (function(  ) {
    var settings = {
        URL : 'ws://localhost:8080'
    };

    return {
        buildSocket: function() {
            return new WebSocket(settings.URL)
        },

        initializeRoom: function( data, socket ) {
            var msg = {
                message_type : data.room_type,
                user : data.user,
                room : data.room,
                password : data.password
            }

            socket.send( JSON.stringify(msg) );
        },

        addModel: function( data, socket ) {
            var msg = {
                message_type : "add",
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
                message_type : "edit",
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