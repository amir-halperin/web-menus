(function()
{
	function checkboxMenuClass(containerId) {
		var mContainerId = containerId;
		// containerId: should be the id of the container DOM element
		// menuItems should be [{id:<number>, name:<string>}...{}]
		function Create(menuItems)
		{
			console.log('menu.create()');

			$('#'+containerId).append('<form>');
			$('#'+containerId+'>form').append('<div class="multiselect">');
			$('#'+containerId).find('.multiselect')
				.append('<div class="selectBox">')
				.append('<div id="checkboxes">');
			$('#'+containerId).find('.selectBox').on('click', function()
			{
				var checkboxes = $('#'+containerId).find('#checkboxes').get(0);
		        if (!expanded) {
		            checkboxes.style.display = "block";
		            expanded = true;
		        } else {
		            checkboxes.style.display = "none";
		            expanded = false;
		        }
			});
			$('#'+containerId).find('.selectBox')
				.append('<select><option>Choose Option</option></select>')
				.append('<div class="overSelect">');

			// assume menuItem is array of objects structured as [{id:<number>, name:<string>},..{id:<number>, name:<string>}]
			$.map(menuItems, function(item)
			{
				$('#'+containerId).find('#checkboxes').append('<div class="checkbox-item" id='+item.id+'>');
				$('#'+containerId).find('.checkbox-item#'+item.id)
					.append('<input type="checkbox" id="'+item.id+'"/>')
					.append('<label">'+item.name+'</label>');
					
			});

			$('#'+containerId).find('input').on('click', function(ev)
			{
				console.log('item id '+ ev.target.id + ' checked ' + ev.target.checked);
				$('#'+containerId).trigger('checkbox-menu-item-selected', {id: ev.target.id, isSelected: ev.target.checked});
			});
		}
		function Destroy()
		{
			console.log('menu.destroy()');
		}

		return {
			create: Create,
			destroy: Destroy
		};
	}
	// containerId,  the DOM element ID in which to create the menu
	function factory(containerId)
	{
		return new checkboxMenuClass(containerId);
	}
	function init()
	{
		window.modules.checkboxmenu = factory;
	}

	window.modules.factory.register(init);
})();