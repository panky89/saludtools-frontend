import Input from './Input.vue'

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {},
}

const Template = (args) => ({
  components: { Input },
  setup() {
    return { args: args }
  },
  template: `<Input v-bind="args" />`,
})

const TemplateForm = (args) => ({
  components: { Input },
  setup() {
    return { args: args }
  },
  template: `<form class="p-2">
  <Input label="name" placeholder="Nombre" class="mt-4" />
  <Input label="description" placeholder="Descripcion" class="mt-4" type="area" />
  <Input label="duration" placeholder="Duracion" class="mt-4" type="number" />
  </form>`,
})

export const Text = Template.bind({})
Text.args = { placeholder: 'Search' }

export const Form = TemplateForm.bind({})
Form.args = {}
