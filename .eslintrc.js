module.epxorts = {
	root: true,
	extends: ['plugin:tailwindcss/recommended'],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js'],
			parser: '@typescript-eslint/parser',
		},
	],
	settings: {
		tailwindcss: {
			// These are the default values but feel free to customize
			callees: ['classnames', 'clsx', 'ctl'],
			config: 'tailwind.config.js', // returned from `loadConfig()` utility if not provided
			cssFiles: [
				'**/*.css',
				'!**/node_modules',
				'!**/.*',
				'!**/dist',
				'!**/build',
			],
			removeDuplicates: true,
			skipClassAttribute: false,
			whitelist: [],
			tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
			classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
		},
	},
}
