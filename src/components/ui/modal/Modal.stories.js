import Button from '../button/Button.vue'
import Modal from './Modal.vue'

export default {
  title: 'Example/Modal',
  component: Modal,
  argTypes: {},
}

const Template = (args) => ({
  components: { Button, Modal },
  setup() {
    return { args }
  },
  template: `<Modal title="Crear nueva cita">
    <template #activator="{ toggle }">
        <Button color="blue" @click="toggle">Open Modal</Button>
    </template>

    <div>
        Hello word!
    </div>
  </Modal>`,
})

export const Simple = Template.bind({})
Simple.args = {}
