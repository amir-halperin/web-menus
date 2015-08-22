(function()
{
	function ModulesClass()
	{
		var mModules = [];

		function Register(moduleInitFunctor)
		{
			if(typeof(moduleInitFunctor) !== 'function')
			{
				throw 'client must register with an init function';
			}
			mModules.push(moduleInitFunctor);
		}
		function Init()
		{
			mModules.map(function(initFunctor)
			{
				initFunctor();
			});
		}

		return {
			register: Register,
			init: Init
		};
	}
	function AppMain()
	{
		console.log('helo world');
		window.modules.factory.init();

		var myMenu1 = window.modules.menu('menu1');
		var myMenu2 = window.modules.menu('menu2');
		var myMenu3 = window.modules.checkboxmenu('menu3');

		myMenu1.create([
			{id:10, name:'aaaa'},
			{id:20, name:'abba'},
			{id:30, name:'acca'},
			{id:40, name:'daad'},
			{id:50, name:'ffaaaff'}
		]);

		myMenu2.create([
			{id:11, name:'amir'},
			{id:12, name:'lihi'},	
			{id:13, name:'yael'},	
			{id:14, name:'tomer'},
			{id:15, name:'yochi'}
		]);

		myMenu3.create([
			{id:11, name:'amir'},
			{id:12, name:'lihi'},	
			{id:13, name:'yael'},	
			{id:14, name:'tomer'},
			{id:15, name:'yochi'}
		]);
	}

	window.modules = {};
	window.modules.factory = new ModulesClass();
	window.onload=AppMain;
})();