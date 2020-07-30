export default {
  name: 'medium',
  type: 'document',
  title: 'Mediums',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
