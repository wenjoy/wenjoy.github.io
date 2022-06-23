/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //a fix of automatically convert kebab-case class name to camel-case when use css in module solution 
  	webpack: (config) => {
		// camel-case style names from css modules
		config.module.rules
			.find(({oneOf}) => !!oneOf).oneOf
			.filter(({use}) => JSON.stringify(use)?.includes('css-loader'))
			.reduce((acc, {use}) => acc.concat(use), [])
      .forEach(({ options }) => {
				if (options.modules) {
					options.modules.exportLocalsConvention = 'camelCase';
				}
			});

		return config;
	},
  async redirects() {
    return [
      {source: '/', destination:'/antechamber', permanent: true}
    ]
  }
}

module.exports = nextConfig
