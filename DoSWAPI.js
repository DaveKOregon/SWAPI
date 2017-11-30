jQuery(document).ready(function() {
	jQuery(document).on('click', 'ul#Resources a[data-resourceurl]', function() {
		var resourceName = jQuery(this).text();
		var resourceURL = jQuery(this).data('resourceurl');
		
		jQuery('ul#Items').empty();
		jQuery('h1#ResourceItemName').empty();
		jQuery('div#ResourceItem').empty();

		jQuery('h1#ResourceName').text(resourceName);
		jQuery('div#Message').text('Getting ' + resourceName);

		jQuery.ajax({
			url: resourceURL,
			type: 'GET',
			data: { format: 'json' },
			success: function(response) {
				jQuery.each(response.results, function(itemNum, item) {
					var itemURL = item.url;
					var itemText = '';
					
					if (resourceName == 'Films')
						itemText = item.title;
					else
						itemText = item.name;
						
					jQuery('ul#Items').append('<li><a href="#" data-resourceurl="' + itemURL + '">' + itemText + '</a></li>');
				});
				
				jQuery('div#Message').text(resourceName + ' retrieved successfully');
			},
			error: function() {
				jQuery('div#Message').text('An error occurred while getting SWAPI data (use console to see the error');
			}
		});
	});

	jQuery(document).on('click', 'ul#Items a[data-resourceurl]', function() {
		var resourceItemName = jQuery(this).text();
		var resourceURL = jQuery(this).data('resourceurl');
		
		jQuery('div#ResourceItem').empty();

		jQuery('h1#ResourceItemName').text(resourceItemName);
		jQuery('div#Message').text('Getting ' + resourceItemName);

		jQuery.ajax({
			url: resourceURL,
			type: 'GET',
			data: { format: 'json' },
			success: function(response) {
				jQuery.each(response, function(itemName, item) {
					jQuery('div#ResourceItem').append(itemName + ' - ' + item + '<br />');
				});
				
				jQuery('div#Message').text(resourceItemName + ' retrieved successfully');
			},
			error: function() {
				jQuery('div#Message').text('An error occurred while getting SWAPI data (use console to see the error');
			}
		});
	});
});