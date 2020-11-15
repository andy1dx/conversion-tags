<template>
  <div>
    <q-toolbar class="text-primary row justify-between items-center">
      <q-btn-group flat class="col-3">
        <q-btn color="primary" flat label="Prev" @click="onPrev" />
        <q-btn color="primary" flat label="Next" @click="onNext" />
      </q-btn-group>
      <div class="col-4" style="text-align: center;font-size: 1.5em;">{{ title }}</div>
      <q-select
        outlined
        dense
        emit-value
        map-options
        label="言語選択"
        v-model="locale"
        :options="locales"
        class="col-4"
      ></q-select>
    </q-toolbar>
    <q-separator class="full-width" />
    <q-calendar
      v-model="selectedDate"
      :view="viewType"
      :locale="locale"
      style="height: 100%;"
      :drag-over-func="onDragOver"
      :drop-func="onDrop"
      animated
      @click:day="onClickDay"
      @change="onChange"
      class="calendar-container"
      ref="calendar"
    >
      <template v-if="isMonth" #day="{ timestamp }">
        <template v-for="(event, index) in getEvents(timestamp.date)">
          <q-badge
            :key="index"
            style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
            class="q-event"
            :class="badgeClasses(event, 'day')"
            :style="badgeStyles(event, 'day')"
            :draggable="true"
            @dragstart.native="(e) => onDragStart(e, event)"
            @dragend.native="(e) => onDragEnd(e, event)"
            @dragenter.native="(e) => onDragEnter(e, event)"
            @touchmove.native="(e) => {}"
            @click="(e) => { onClickEventBadge(e, event) }"
          >
            <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon><span class="ellipsis">{{ event.title }}</span>
          </q-badge>
        </template>
      </template>
    </q-calendar>
    <q-dialog v-model="isOpenAddDialog">
      <q-card>
        <q-toolbar class="bg-primary" style="color: #fff">
          <q-avatar>
            <q-icon name="calendar_today" />
          </q-avatar>
          <q-toolbar-title><span>{{addDialogTitle}}</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <q-input v-model="addTitle" label="Title">
            <template v-slot:prepend>
              <q-icon name="bookmark" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="addDetails"
            label="Memo"
            outlined
            type="textarea"
          >
            <template v-slot:prepend>
              <q-icon name="create" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import QCalendar, { makeDate } from '@quasar/quasar-ui-qcalendar'
import CALENDAR_VIEW_TYPE, { isWeek, isMonth } from '../enums/CALENDAR_VIEW_TYPE.js'
import CALENDAE_LOCALS, { getAsArr } from '../enums/CALENDAE_LOCALS.js'
import DAY_OF_WEEK_ARR from '../enums/DAY_OF_WEEK_ARR.js'
const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/
const textToRgb = color => {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }
  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}
const hexToRgb = hex => {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }
  const num = parseInt(hex, 16)
  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}
const luminosity = color => {
  if (typeof color !== 'string' && (!color || color.r === undefined)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }
  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}
export default {
  data () {
    return {
      title: '',
      viewType: CALENDAR_VIEW_TYPE.MONTH,
      selectedDate: '',
      locale: CALENDAE_LOCALS.EN_US.value,
      locales: getAsArr(),
      isOpenAddDialog: false,
      addDialogTitle: '',
      addTitle: '',
      addDetails: '',
      events: [
        {
          title: '山田太郎さん',
          details: 'Everything is funny as long as it is happening to someone else',
          date: '2020-08-01',
          time: '10:00',
          duration: 120,
          bgcolor: 'orange',
          icon: 'account_box',
          days: 0,
          room: 'TaroRoom'
        },
        {
          title: '鈴木一郎さん',
          details: 'Buy a nice present',
          date: '2020-08-04',
          time: '10:00',
          duration: 120,
          bgcolor: 'green',
          icon: 'account_box',
          days: 0,
          room: 'IchiroRoom'
        },
        {
          title: '片岡花江さん',
          details: 'Time to pitch my idea to the company',
          date: '2020-08-13',
          time: '10:00',
          duration: 120,
          bgcolor: 'red',
          icon: 'account_box',
          days: 0,
          room: 'HanaeRoom'
        },
        {
          title: '水島景子さん',
          details: 'Company is paying!',
          date: '2020-08-13',
          time: '11:30',
          duration: 90,
          bgcolor: 'teal',
          icon: 'account_box',
          days: 0,
          room: 'KeikoRoom'
        },
        {
          title: '川田敏巳さん',
          details: 'Company is paying!',
          date: '2020-08-10',
          time: '11:30',
          duration: 90,
          bgcolor: 'blue',
          icon: 'account_box',
          days: 0,
          room: 'KawataRoom'
        },
        {
          title: '山崎悠さん',
          details: 'Company is paying!',
          date: '2020-08-10',
          time: '11:30',
          duration: 90,
          bgcolor: 'blue-grey',
          icon: 'account_box',
          days: 0,
          room: 'HarukaRoom'
        },
        {
          title: '内藤学さん',
          details: 'Company is paying!',
          date: '2020-08-21',
          time: '11:30',
          duration: 90,
          bgcolor: 'purple',
          icon: 'account_box',
          days: 0,
          room: 'ManabuRoom'
        }
      ]
    }
  },
  methods: {
    onClickDay (e) {
      const { date, weekday } = e.scope
      this.addDialogTitle = `${date} (${DAY_OF_WEEK_ARR[weekday]})`
      this.isOpenAddDialog = true
    },
    onClickEventBadge (e, event) {
      this.$emit('click-event', event)
      e.stopPropagation()
      e.preventDefault()
    },
    onDragEnter (e, event) {
      e.preventDefault()
    },
    onDragStart (e, event) {
      this.dragging = true
      this.draggedEvent = event
      e.stopPropagation()
    },
    onDragEnd (e, event) {
      e.preventDefault()
      e.stopPropagation()
      this.resetDrag()
    },
    onDragOver (e, day, type) {
      if (type === 'day') {
        e.preventDefault()
        e.stopPropagation()
        return this.draggedEvent.date !== day.date
      } else if (type === 'interval') {
        e.preventDefault()
        e.stopPropagation()
        return this.draggedEvent.date !== day.date && this.draggedEvent.time !== day.time
      }
    },
    onDrop (ev, day, type) {
      ev.preventDefault()
      ev.stopPropagation()
      if (type === 'day') {
        this.draggedEvent.date = day.date
        this.draggedEvent.side = undefined
      } else if (type === 'interval') {
        this.draggedEvent.date = day.date
        this.draggedEvent.time = day.time
        this.draggedEvent.side = undefined
      }
    },
    onChange ({ start }) {
      this.start = start
      this.updateTitle()
    },
    onPrev () {
      this.$refs.calendar.prev()
    },
    onNext () {
      this.$refs.calendar.next()
    },
    updateTitle () {
      const myDate = makeDate(this.start)
      if (this.dateFormatter !== undefined) {
        this.title = this.dateFormatter.format(myDate)
      }
    },
    updateFormatter () {
      try {
        this.dateFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          month: this.shortMonthLabel ? 'short' : 'long',
          year: 'numeric',
          timeZone: 'UTC'
        })
      } catch (e) {
        this.dateFormatter = undefined
      }
    },
    resetDrag () {
      this.draggedEvent = undefined
      this.dragging = false
    },
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },
    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s.top = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    getEvents (dt) {
      const currentDate = QCalendar.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        if (this.events[i].date === dt) {
          if (this.events[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendar.parseTimestamp(this.events[i].date + ' ' + this.events[i].time)
              const endTime = QCalendar.addToDate(startTime, { minute: this.events[i].duration })
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  const startTime2 = QCalendar.parseTimestamp(events[j].date + ' ' + events[j].time)
                  const endTime2 = QCalendar.addToDate(startTime2, { minute: events[j].duration })
                  if (QCalendar.isBetweenDates(startTime, startTime2, endTime2) || QCalendar.isBetweenDates(endTime, startTime2, endTime2)) {
                    events[j].side = 'left'
                    this.events[i].side = 'right'
                    events.push(this.events[i])
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            this.events[i].side = undefined
            events.push(this.events[i])
          }
        } else if (this.events[i].days) {
          // check for overlapping dates
          const startDate = QCalendar.parseTimestamp(this.events[i].date)
          const endDate = QCalendar.addToDate(startDate, { day: this.events[i].days })
          if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(this.events[i])
            added = true
          }
        }
      }
      return events
    }
  },
  computed: {
    isWeek () {
      return isWeek(this.viewType)
    },
    isMonth () {
      return isMonth(this.viewType)
    },
    eventsMap () {
      const map = {}
      this.events.forEach((event) => (map[event.date] = map[event.date] || []).push(event))
      return map
    }
  },
  watch: {
    locale () {
      this.updateFormatter()
      this.updateTitle()
    }
  },
  beforeMount () {
    this.updateFormatter()
  }
}
</script>
