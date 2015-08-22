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
			$('#'+containerId+'>form').append('<div class="multiselect"');
			$('#'+containerId).find('multiselect').append('div class="selectBox"').append('<div id="checkboxes"');
			$('#'+containerId).find('selectBox').on('click', function()
			{
				var checkboxes = $('#'+containerId).find('checkboxes').get(0);
		        if (!expanded) {
		            checkboxes.style.display = "block";
		            expanded = true;
		        } else {
		            checkboxes.style.display = "none";
		            expanded = false;
		        }
			});
			$('#'+containerId).find('selectBox').append('<select><option>Select and option</option></select>').append('<div class="overSelect">');

			// assume menuItem is array of objects
			menuItems.map(function(item)
			{
				$('#'+containerId).find('#checkboxes').append('<label for="'+item.id+'"><input type="checkbox" id="'+item.id+'"/>'+item.name+'</label>');
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