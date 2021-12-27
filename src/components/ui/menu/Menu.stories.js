import Menu from './Menu.vue'
import Button from '../button/Button.vue'

export default {
  title: 'Example/Menu',
  component: Menu,
  argTypes: {},
}

const Template = (args) => ({
  components: { Menu, Button },
  setup() {
    return { args }
  },
  template: `<Menu v-bind="args"> 
    <template #activator="{ toggle }">
      <Button @click="toggle">
        Open Menu
      </Button>
    </template>

    <template #default>
      Hello word!
    </template>
  </Menu>`,
})

export const Simple = Template.bind({})
