module.exports = {
	title: '毒液文档',
	description: '本站使用vuepress搭建',
	base: '/',
	themeConfig: {
		// 添加导航栏
		nav: [{
				text: '首页',
				link: '/'
			},
			{
				text: '前端',
				items: [{
						text: 'HTML',
						link: '/web/HTML'
					},
					{
						text: 'CSS',
						link: '/web/CSS'
					},
					{
						text: 'JAVASCRIPT',
						link: '/web/JAVASCRIPT'
					},
					{
						text: 'Javascirpt深入系列',
						link: '/web/Javascirpt深入系列'
					},
					{
						text: 'vuejs系列',
						link: '/web/vuejs系列'
					},
					{
						text: 'react系列',
						link: '/web/react系列'
					}
				]
			},
			{
				text: '后端',
				items: [{
					text: 'node',
					link: '/backEnd/node'
				}, ]
			},
			{
				text: '工具',
				items: [{
						text: 'git',
						link: '/tool/git'
					},
					{
						text: '其他',
						link: '/tool/other'
					}
				]
			},
			{
				text: '服务器',
				items: [{
						text: 'nginx',
						link: '/server/nginx'
					},
					//{ text: 'linux', link: '/server/linux' },
					{
						text: 'mysql',
						link: '/server/mysql'
					}
				]
			},
			{
				text: '博客',
				link: 'http://evinweb.com'
			},
			{
				text: 'github',
				link: 'https://github.com/evinLiang'
			}
		]
	},
}