import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      timeAgo: (date: string | Date) => dayjs(date).fromNow()
    }
  }
})