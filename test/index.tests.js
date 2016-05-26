import expect from 'expect'
import {spy} from 'sinon'
import {fetchComponentData} from '../src'

describe('fl-utils', () => {

  it('fetchComponentData calls fetchData on each component', done => {

    const options = {store: 'store', action: 'action'}

    const fetchSpy = spy(({store, action}, callback) => {
      expect(store).toEqual(options.store)
      expect(action).toEqual(options.action)
      callback(null, {status: 200})
    })

    options.components = [{
      fetchData: fetchSpy,
    }, {
      WrappedComponent: {
        fetchData: fetchSpy,
      },
    }]

    fetchComponentData(options, (err, res) => {
      expect(err).toNotExist()
      expect(res).toExist()
      expect(res.status).toEqual(200)
      expect(fetchSpy.calledTwice).toExist()
      done()
    })
  })

  it('fetchComponentData gracefully bails if components lack fetchData', done => {

    const options = {components: [null, {}]}

    fetchComponentData(options, (err, res) => {
      expect(err).toNotExist()
      expect(res).toExist()
      done()
    })
  })

})
