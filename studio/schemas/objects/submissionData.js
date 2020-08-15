export default {
  name: 'submissionData',
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
