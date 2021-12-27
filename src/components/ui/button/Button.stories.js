import Button from './Button.vue'
import { Icon } from '@vicons/utils'
import { Accessible } from '@vicons/tabler'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['blue', 'gray', 'green', 'red'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
}

const TemplateIcon = (args) => ({
  components: { Button, Icon, Accessible },
  setup() {
    return { args }
  },
  template: `<Button v-bind="args"> 
    <Icon>
      <Accessible/>
    </Icon>
  </Button>`,
})

const TemplateText = (args) => ({
  components: { Button, Icon, Accessible },
  setup() {
    return { args }
  },
  template: `<Button v-bind="args"> 
    Hello word!
  </Button>`,
})

const TemplateIconText = (args) => ({
  components: { Button, Icon, Accessible },
  setup() {
    return { args }
  },
  template: `<Button v-bind="args"> 
    <Icon>
      <Accessible/>
    </Icon>
    
    <span class="pl-1">
      Hello word!
    </span>
  </Button>`,
})

export const OnlyIcon = TemplateIcon.bind({})
OnlyIcon.args = { color: 'gray', size: 'md' }

export const OnlyText = TemplateText.bind({})
OnlyText.args = { color: 'gray', size: 'md' }

export const IconText = TemplateIconText.bind({})
IconText.args = { color: 'gray', size: 'md' }

export const IconTextDisabled = TemplateIconText.bind({})
IconTextDisabled.args = { color: 'gray', size: 'md', disabled: true }

export const IconTextLoading = TemplateIconText.bind({})
IconTextLoading.args = { color: 'gray', size: 'md', loading: true }
