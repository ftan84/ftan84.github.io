$(function () {
    var $properties = $('#properties');

    function updateTable(property) {
        $properties.append(
            '<tr>' +
                '<td>' + property.zpid + '</td>' +
                '<td>' + property.street + '</td>' +
                '<td>' + property.city + '</td>' +
                '<td>' + property.zip + '</td>' +
                '<td>' + property.useCode + '</td>' +
                '<td>' + property.bedrooms + '</td>' +
                '<td>' + property.bathrooms + '</td>' +
                '<td>' + property.lastSoldPrice + '</td>' +
            '</tr>'
        )
    };

    $('#query').on('click', function() {
        console.log('clicked button');
        var $url = 'http://0.0.0.0:5000/api/housing-predictor/v1/getProperties?';
        var $city = $('#city').val();
        var $useCode = $('#useCode').val();
        var $bedrooms = $('#bedrooms').val();
        var $bathrooms = $('#bathrooms').val();
        var $limit = $('#limit').val();
        if ($city == '') {
            $city = '%';
        }
        if ($bedrooms == '') {
            $bedrooms = '%';
        }
        if ($bathrooms == '') {
            $bathrooms = '%';
        }
        $url = $url +
            'city=' + $city + '&' +
            'useCode=' + $useCode + '&' +
            'bedrooms=' + $bedrooms + '&' +
            'bathrooms=' + $bathrooms + '&' +
            'limit=' + $limit;
        console.log($url);
        $.ajax({
            type: 'GET',
            url: $url,
            success: function(properties) {
                $('#properties tr').remove();
                $properties.append(
                    '<tr>' +
                        '<th>ZPID</th>' +
                        '<th>Street Address</th>' +
                        '<th>City</th>' +
                        '<th>Zip</th>' +
                        '<th>Type</th>' +
                        '<th>Bed</th>' +
                        '<th>Bath</th>' +
                        '<th>Last Sold Price</th>' +
                    '</tr>'
                );
                $.each(properties, function(i, property) {
                    updateTable(property);
                });
            }
        });
    });
});
