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
  <InputText label="name" placeholder="Nombre" />
  <InputText label="description" placeholder="Descripcion" />
  <InputText label="duration" placeholder="Duracion" />
  </form>`,
})

export const Text = Template.bind({})
Text.args = { placeholder: 'placeholder' }

export const Form = TemplateForm.bind({})
Form.args = {}
