export const EditorSchema = {
    message_type : {
        CREATE_ROOM : 0,
        JOIN_ROOM : 1,
        LEAVE_ROOM : 2
    },
    server_status : {
        OK : 200,
        BAD : 460,
        UNKNOWN_ROOM : 461,
        DUPLICATE_ROOM : 462,
        INVALID_ROOM_PASSWORD : 463,
        INVALID_USER : 464,
        INVALID_USER_PASSWORD : 465
    }
};
Object.freeze(EditorSchema)

export var EditorInterface = (function(  ) {
    var settings = {
        URL : process.env.REACT_APP_BOWSHOCK_SERVER
    };

    return {
        url: function() {
            return settings.URL
        },

        buildSocket: function() {       
            return new WebSocket(settings.URL)
        },

        initializeRoom: function( data, wsc ) {
            var msg = {
                message_type : data.room_type,
                user_name : data.user_name,
                user_password : data.user_password,
                room_name : data.room_name,
                room_password : data.room_password
            }

            wsc.send( JSON.stringify(msg) );
        },

        leaveRoom: function(wsc) {
            var msg = {
                message_type : EditorSchema.message_type.LEAVE_ROOM
            }

            wsc.send( JSON.stringify(msg) );            
        },

        addModel: function( data, wsc ) {
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

            wsc.send( JSON.stringify(msg) );
        },

        editModel: function( data, wsc ) {
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

            wsc.send( JSON.stringify(msg) );
        }
    };

})();