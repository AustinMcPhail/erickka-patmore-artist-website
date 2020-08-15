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
      type: 'submissionData',
      title: 'Data'
    }
  ]
}
