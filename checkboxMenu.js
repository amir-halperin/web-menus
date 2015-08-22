(function()
{
	function checkboxMenuClass(containerId) {
		var mContainerId = containerId;
		var mItemIdInFocus = -1;
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
					.append('<label type="label" id="'+item.id+'">'+item.name+'</label>');
					
			});

			$('#'+containerId).find('input').on('click', function(ev)
			{
				console.log('item id '+ ev.target.id + ' checked ' + ev.target.checked);
				$('#'+containerId).trigger('checkboxmenu-selected-item-changed', {id: ev.target.id, isSelected: ev.target.checked});
			});
			$('#'+containerId).find('label').on('click', function(ev)
			{
				console.log("checkbox-item-focus-changed to " + ev.target.id);
				// remove marker from prev focused item
				if(mItemIdInFocus != -1) 
				{
					$('#'+containerId).find('.checkbox-item#'+mItemIdInFocus).find('label').toggleClass('checkbox-selected-item', false);
				}
				 // remember the new item in focus
				mItemIdInFocus = ev.target.id;
				// mark the new focused item
				$('#'+containerId).find('.checkbox-item#'+ev.target.id).find('label').toggleClass('checkbox-selected-item', true);
				// announce client on new selected item in focus
				$('#'+containerId).trigger('checkboxmenu-focus-item-changed', {id: ev.target.id});
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