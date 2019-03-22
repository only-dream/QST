$(function() {
        var source = [{
            id: 1,
            name: "Aditya Purwa",
            level: "Admin"
        }, {
            id: 2,
            name: "Aditya Avaga",
            level: "Manager"
        }, {
            id: 101,
            name: "Aditya Myria",
            level: "User"
        }, {
            id: 102,
            name: "Lucent Serentia",
            level: "LOD"
        }, {
            id: 103,
            name: "Hayden Bapalthiel",
            level: "King"
        }, ];

        function resetTabullet() {
            $("#table").tabullet({
                data: source,
                action: function(mode, data) {
                    console.dir(mode);
                    if (mode === 'save') {
                        source.push(data);
                    }
                    if (mode === 'edit') {
                        for (var i = 0; i < source.length; i++) {
                            if (source[i].id == data.id) {
                                source[i] = data;
                            }
                        }
                    }
                    if (mode == 'delete') {
                        for (var i = 0; i < source.length; i++) {
                            if (source[i].id == data) {
                                source.splice(i, 1);
                                break;
                            }
                        }
                    }
                    resetTabullet();
                }
            });
        }

        resetTabullet();
    });