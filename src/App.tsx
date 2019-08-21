import React from 'react'
import { timer } from 'rxjs'
import { map, combineLatest } from 'rxjs/operators'
import ObservableView from './rxjs-helpers/ObservableView'

const fruitList = ['pineapple', 'strawberry', 'banana', 'peach']
const vegetableList = ['peas', 'carrots', 'broccoli']

class App extends React.Component {

  fruit = timer(0, 2000).pipe(
    map(i => fruitList[i % fruitList.length])
  )
  vegetable = timer(0, 4500).pipe(
    map(i => vegetableList[i % vegetableList.length])
  )

  fruitAndVegetables = this.fruit.pipe(
    combineLatest(
      this.vegetable,
      (fruit, vegetable) => `${fruit} & ${vegetable}`
    )
  )

  render() {
    return (
      <div className='basket'>
        <ObservableView observable={this.fruit}>
          { frt => 
            <div key={frt} className='flash foodItem'> 
              {frt}
            </div>
          }
        </ObservableView>
        <ObservableView observable={this.vegetable}>
          { veg => 
            <div key={veg} className='flash foodItem'>
              {veg}
            </div>
          }
        </ObservableView>
        <ObservableView observable={this.fruitAndVegetables}>
          { fav => 
            <div key={fav} className='flash foodItem'>
              {fav}
            </div>
          }
        </ObservableView>
      </div>
    )
  }
}

export default App
