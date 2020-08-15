export default {
  name: 'submission.form',
  type: 'document',
  title: 'Form submission',
  readOnly: true,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'number',
      type: 'number',
      title: 'Number'
    },
    {
      name: 'created_at',
      type: 'datetime',
      title: 'Created at'
    },
    {
      name: 'data',
      type: 'object',
      title: 'Data',
      fields: [
        {
          name: 'email',
          type: 'email',
          title: 'Email'
        },
        {
          name: 'name',
          type: 'string',
          title: 'Name'
        },
        {
          name: 'message',
          type: 'text',
          title: 'Message'
        },
        {
          name: 'role',
          type: 'array',
          title: 'Role',
          of: [{type: 'string'}]
        }
      ]
    }
  ]
}
