import InputText from './InputText.vue'

export default {
  title: 'Example/Input',
  component: InputText,
  argTypes: {},
}

const Template = (args) => ({
  components: { InputText },
  setup() {
    return { args: args }
  },
  template: `<InputText v-bind="args" />`,
})

const TemplateForm = (args) => ({
  components: { InputText },
  setup() {
    return { args: args }
  },
  template: `<form>
  <InputText label="name" placeholder="Nombre" class="mt-4" />
  <InputText label="description" placeholder="Descripcion" class="mt-4" />
  <InputText label="duration" placeholder="Duracion" class="mt-4" />
  </form>`,
})

export const Text = Template.bind({})
Text.args = { placeholder: 'Search' }

export const Form = TemplateForm.bind({})
Form.args = {}
