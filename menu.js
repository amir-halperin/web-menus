(function()
{
	function MenuClass(containerId) {
		var mContainerId = containerId;
		// containerId: should be the id of the container DOM element
		// menuItems should be [{id:<number>, name:<string>}...{}]
		function Create(menuItems)
		{
			console.log('menu.create()');

			$('#'+containerId).append('<select>');

			// assume menuItem is array of objects
			menuItems.map(function(item)
			{
				$('#'+containerId+'>select').append('<option id='+item.id+'>'+item.name+'</option>');
			});
		}
		function Destroy()
		{
			console.log('menu.destroy()')
		}

		return {
			create: Create,
			destroy: Destroy
		};
	}
	function MenuFactory(containerId)
	{
		return new MenuClass(containerId);
	}
	function init()
	{
		window.modules.menu = MenuFactory;
	}

	window.modules.factory.register(init);
})();