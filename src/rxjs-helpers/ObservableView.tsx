import React from 'react'
import { Observable, Subscription } from 'rxjs'

interface Props<T> {
  observable: Observable<T>
  children: (value: T) => any
}

interface State<T> {
  value: T | null
}

export default class ObservableView<T> extends React.Component<Props<T>, State<T>> {

  state: State<T> = {
    value: null
  }

  subscription: Subscription

  constructor(props: any) {
    super(props)
    this.subscription = this.props.observable.subscribe(value => this.setState({ value }))
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    return(
      this.state.value !== null ?
        this.props.children(this.state.value)
      : null
    )
  }
}