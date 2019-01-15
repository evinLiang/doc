module.exports = {
	title: '技术文档',
	description: '本站使用vuepress搭建',
	themeConfig: {
		// 添加导航栏
		nav: [{
				text: '首页',
				link: '/'
			},
			{
				text: '前端',
				items: [
          { text: 'HTML', link: '/web/HTML' },
          { text: 'CSS', link: '/web/CSS' },
					{ text: 'JAVASCRIPT', link: '/web/JAVASCRIPT' }
        ]
			},
			{
				text: '工具',
				link: '/tool/'
			},
			{
				text: '博客',
				link: 'http://evinweb.com'
			},
			{
				text: 'github',
				link: 'https://github.com/evinLiang'
			},
		]
	},
}
