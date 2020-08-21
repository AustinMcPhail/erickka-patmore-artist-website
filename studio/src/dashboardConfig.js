export default {
  widgets: [
    {name: 'structure-menu'},
    // {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent Journal posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium', height: 'auto'}
    },
    {
      name: 'document-list',
      options: {
        title: 'Recent additions to your Portfolio',
        order: '_createdAt desc',
        types: ['portfolioEntry']
      },
      layout: {width: 'medium', height: 'auto'}
    }
  ]
}
