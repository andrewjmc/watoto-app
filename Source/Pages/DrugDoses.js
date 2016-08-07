'use strict'

import React from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  RecyclerViewBackedScrollView,
  TouchableHighlight,
  Image,
  View,
  ListView,
  Text,
} from 'react-native'

const Ionicons = require('../UI/Ionicons') // react-native-vector-icons/Ionicons

const GLOBAL = require('../Globals')
const Router = require('../Router')

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    paddingTop: (8 + (2 * GLOBAL.SCREEN_PADDING)),
    paddingBottom: (8 + (2 * GLOBAL.SCREEN_PADDING)),
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  },
  separator: {
    height: GLOBAL.PIXEL,
    backgroundColor: '#CCC',
  },
  thumb: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  label: {
    flex: 2,
    fontSize: 20,
    color: '#000',
  },
  next: {
    flex: 1,
    paddingTop: 2,
    fontSize: 24,
    color: '#4F8EF7',
    textAlign: 'right',
  },
})

const sections = [
  {
    label: 'Emergency',
    type: 'emergency',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACFlBMVEUAAADtSSTnRSTnRCXoRCToRSXnRSXnRSXnRST/ZjPoRCTnRCTnRSXnRybnRSXnRSTqRiXnRCXoRCToRi7/VTnnRSTpRiToRCXoRSTpRSbpRCXrYELtemD44tb48efoRCTpRyXoRiToRCXoRCTpUzb48ufpUDHoRCXoRSTpRybqRCboRSTxm4frYUTrWTzoRCXrTifqRSbnRSX239Htclf24tX47OHoRSXwSy3uRCvoRCTpTi/48ubtg2voRij48ub48ufnSSrnRSTvkXr15dnxmIHsbFLoRCX118rxloDwqpbwoIvsfGToRSTnSiv48ef46t7qZUnzu6v34dTrb1T2zr/oRCT////zs6DpVTj0zb7ujXX0yrr37OHyt6bnRiXrZUn12sz0x7f36Nz45Nf21cfsRCXoRyb38eX38Ob369/zsp/48OX25tntSSTsfGL37eHzr5z37uP36dz38OXuinP25dnqUDH128348ubzxbX48ej38eb34NT11cf108T48OX38eb37+TwqZXtd1747+X48uf58uj38ubtc1rra1DvpI/uiHH38ef/9ev78+bzqJLraU748efpYkX48eP4+On////47uPoRiXvlHz36t7oRCXraEvyrproRSTqSivnRCXqVznpSSTnRSToRCTujnbqWj3oRSXoRSXrYEHpRibqRibnRSbnRCXoRSTnRCT38eb///+mw2PaAAAAr3RSTlMAHHesxsjAoFUFePfWNpf1PmHoFgmNW/LEc3Tgz830/lOatL7s/PDchS882sLg5qUNSvjJ083czxEe8PL4yvv2/fmixdDD1/vGw8DBzan489bcv8rVwu8Bv+rBx8Dav4vbx8DUzsMp/Ozw2b/v0CrO4L/l0+jIz/DI+cBupbbEw+7q5sDQwb9549LYwcjKGj5s2fLTJCMI4f3F2Lvav+kY7OgjjNLG5ua84mZJa8P9meIBCwAAAAFiS0dEV30K2R8AAAAHdElNRQfgBA4MEyZ1N13aAAACs0lEQVRYw+2X+1dMURTHL6N3jOnlMWWSQYhqIqUmN69QMVIpPSiRQig0EpHkLQ15v0Pe+/snOte609y558yyTvODZa35/jB3r7X39zPn7HPuOTOKElKzZlvmRDFFx8TGKTNQfAJNK3GuvH8eGWWdL+u3UbCSkuX8KUkmAKXKAdLMflog18gYDkByXVjIA2xSgEQesChcwOIIIAL4JwB7epiAjCUOGUBc5tKsZQFZybkcK4IAKw1pS/Yqk3/1GvOUc4C1/ti5jm9Jbp7Rn+/iCgqA9f54QyEPoI1FAX/xJi5dUgq49bhss1ouIFgCgC18diu2Ybse7wDsAkDgkCuq4JM7sQu79bgSqBIBqv2AWD63Z69nH2rYTPbXEtUBOSJA/QEdEM/n3GhoxEGiJjQTtahoFQHIf9kc4lN1OFymthG14wiVqB04KgQc0wGpXKbzOFu4rg6ibpSWp+PEyVNCQE9IwGlt/me6yakCtWdR5emVBLSD9a7vHJ3HBVS2qf1e4UYIDXD0at9YcJEG4EZdbyF72kMCLg0OXr5ikhftLD2EEs9Vx7VhDNF1VI1kdHC6MTp6U7kFkW4zwADuqF7tnbhL95DjFdbhvvJgbOzhiFnj2gAb0Mo2YytrI42jxuexm/Xo8cTEE20WeS7RBNkObmFeN1tI6sdTbV1Myp1+mbKEgCag6xk1oo/FXcAIV5A5DeixigDpQAF7ND9nHy/gKzPnXxoOFJsI8Ap47Y+98JrTb94aj6S0dzzgvdY+XQNsKYIV/SH4UEye/FhvDcjBSsrh6/SXf/J9dhnSU1/+9oPnz8UybBh250xupq9O45j/w7sxAogAwgdE8YBvUgALD/guBfjB+SvypADJVjOgWsqvKNkmv6tHEhD3M5wWakox9tEq959PV75l6pfmTkicLA5d9Rt5pKohaeDXPgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNC0xNFQxMjoxOTozOCswMzowMN1qyTQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDQtMTRUMTI6MTk6MzgrMDM6MDCsN3GIAAAAAElFTkSuQmCC',
  },
  {
  	label: 'Fluids',
  	type: 'fluids',
  	logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAEEfUpiAAAACXBIWXMAAA7HAAAOxwE4ki92AAAEQ0lEQVR42r1XWUhUURg+5qi5MA5jWoL4YEIu00OWmNBLQoqaPSgKpY42liAumCnlgkvkmkuYvqhppigE+WDmUGK+iBlqPqilkD5E4i4m4q7T+cwZ7oz3XmfG5YPhnrn33O9+55z//P93BAqFgjAhUDYMDAzoM4XB3o2dnR1DtR4CgWAb16ysrBwBJ4faDRDiqiJV66HJ4ezs/JPCmZVTSSWVSt9SSNmE40oaGhrCp6ambDs6Om6pOkCAksHe3v43HrJqYB2GEru7u2codjk7GBoa7oSFhTVCA+fMNDY2hrF2gMCKigoSFxdH3NzcvlO4qXVISkoiKysre+3BwcErBxhKS0v5RxEQEPCBIgDtzMzMZ5xroQl0psjUap40ga+2tbXdTkxMfCkWixd1Iqirq7uPl9G2srJawFJqTZCamppfUFDwVDOSNjc3jY2MjLZ4CSwtLf/GxMQIOzs7SWxsLBkdHVU9MzY23mxvb/fz9fWVcxIsLy8LCwsLSXl5OVlbWzugrri4OJmXQLlcbC8DMpmslncIra2td3Dd2NgwoSoSMG5TU9O1hISEcuV+5t2TuoI3Drq7u29QdOtN4O/v/7G6uvphSEjIO70IsCLYf3oR5Ofnp+KKFWEmFK0J0tLS8pTt6OjoKgxFa4La2loZ839NTc0DnQiioqJea94LCgp6TxF0KIFEIhlmDIPk5f0fSUtLS+D4+PhFinFOgtXVVbORkRHX7Oxs4urqSoKDg9XIvb29P4OEk8DT0/PrfulhndiJiQmHoaGhyxRDrATT09MX9hM0sjhndHISQCICh+tlADmbcwjI+CDgermsrOyRh4fHN95VWFhYsEKVnJ2dtWHer6ysjA0PD284dBmRfWdmZs7L5XLfgYGBqyhY+KqXl9cX1kA6Sj7g2yPHkk8OQ0RERH1/f/+13t7e60KhcPlUBXR1dd1Ulvnc3Nx0WgienJqA+fn5cwhZZhFF4ERGRr45cQFbW1tGTk5Oo9vb26p35+bmrEtKSh7b2tpO+fj4fDoxAbCtDg4OE9gqms+Gh4clcAQikWhJc68di4D19fWzsJcYLVcfGDekYurVkphLdGQBY2Njl5CmmdNuYWEBG0MmJyfV+iIbI/fDyycnJxcfWQAyEPWtFXDgoaGhxMbGhvT09GDdibm5+QEBALWyFikpKS/gc5uamu7pLYCa5rj4+PhX+55qz6yZmJjsPUOhSk9P5xXf3Nx8l87USlVVVbReAnJyclSFidZkQqOf+Pn5kb6+PlJUVKRV7ODkU19fH4GkpbMAa2vrOex5tGFTqVHSOWeghDMPfToJgNF0cXH5gb2vT8LCAJAz+BIUrwBHR8dfS0tLIvhL5tnoMKBAZWRkPKfxsoFg1Dzf6bQLzMzMVhHN2ILwazhmLi4uirG2OJOij52d3R93d/c+/DDdSMuBgYEt2lRKrRMRvD0cJn7kGPEPjN0NHTv9rkkAAAAASUVORK5CYII='
  },
  {
    label: 'Antibiotics',
    type: 'antibiotic',
    logo: 'data:image/png;base64,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',
  },
  {
    label: 'Analgesia',
    type: 'analgesic',
    logo: 'data:image/png;base64,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',
  },
  {
    label: 'Anticonvulsants',
    type: 'anticonvulsant',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfgBA4PIgv087hEAAACQ0lEQVRo3u3ZTUgUcRjH8e9mmlYmERvBhkVISBFCEHYKQkJYOlREQYcgYunQy80k8tLBSywdCroYHbwEIWGHigiLuknRwYNYSNCLFbVQbJqZbk8HdR1nZ2Z3duf//A/6e+7z4WFmeP4vsJylnioVZSs1TNhrsp3H9vAYl8lxzBbfwH2Ed0ovuiA7eYsgnLXDH2ccQciwWh9fSRqZqyv6/Eae5fnfxLX5Vj7leeGmNn+GKQefo0kTr+W2AxeEPk1+C69cvNCqxx8gU8A/18JjXCJXwAsHdfh13PPAhWFiGvwORjx54ZQGf5RfPvxnakzjVVz1wQWh0zQfZyCAz9Jglt/DhwBeSJvlU/wJ5P+y2Ry+iluBuCD0muMbeVmUF3aFeWSY1VobT0qYbuN8Icu36Lu/yEwJ3c/XR3o4TH1UeD19IXDn5/iUDtZUyjczXBYvCDNcqJQ/QrZsPkuyUj5VNi68D/c/+KWJ8zxiMjQ/yKYo+PnUkeQGoyXzd6mLkl/I9iJTYLa6zS1GWoriU5w0hQMFC293Zdhnko8XmYMjpjciXYH8AOvN8tWMBfA9VJvl4YQvnqPDNA4w6MNPcEiD3+vDj7Fbg4c7nvxrEjp8gmkPvr/yWV9quj34NCu0+Fq+u/BpUlo4wGkX/4M2TR6GFvGjNOvy+xfxL9igy0O/g+81v+12Z1v++OUfXdo4wLU5ftLOoftafiIIXzWP3Jw5hyAM0WiHj/EG4WF0e7ywSSJct3XfAfDA1m3HbBK02+SXs1TyH1G6gXEAJjPqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA0LTE0VDE1OjM0OjEyKzAzOjAw696lLgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNC0xNFQxNTozNDoxMSswMzowMKtrBw8AAAAASUVORK5CYII=',
  },
  {
    label: 'Others',
    type: 'other',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfgBA4PJDL9rJfKAAADoElEQVRo3u2ZX4hMcRTHP7vsbjKWSLs7tsiT1D4Iq7Bpy5+8LLV/hBdJbSgvtEUJqc2LhHZaD7xQHpCwXvxpU6yaDVH2RYndbdiUDCO7FsfDPXPnzt37b7aZO1t878PMPef8fuf7O+f+fvd3fwf+dZS4aspppImlRIkSmWTvKRIkGOA2vfzMpWE1MZJIHq8kMaqDRaCCIxxkJgBjxBkmQWqSEYgQpZZ6KgD4zmk6GfNuUkWfcu6hZdKht9NooUd77aPKy7SOIQQhTkNeXFvRQBxBGKTOffSDCEI3ZXl3D1BGN4Iw5ByFCg1+R0Gcp9GhiaiYqDqhoy80jCicsIurSSHECxR8K8qII6TskzKGIAV49JzQgCDErKJykgg9obgH6EFIUp4RbEIQmkMj0IIgbMoIuhBG87TsBEGEUYQugFIAlgLxSS+4uSNFXL0qgSgwHJp71Fs0m0AiVAKJbAIRCDEBqLdIhkAR8Z9A0QlM99FvZpf5fy+fc7C24wvt7g0F4bij5q5lY7nHdzgHPLalH7MsjyMI+KVgDustd225hDYovFOwRd9Y99gINDKfT572dxmySUo5ywIAnnk1dEuBsZcdYYmGsZ1ccUpbvmFultxMgReBOYwhCBeAFwjCwxzdb1f3X40XjxMBr2egSRNwHbgGwDrvXb0Ny7kIwB92MuBm5EWgFYDP9CoJmJbDpqWKm8wA4Ch3/IydUjBbE3BJ718iCI8Cui/nsYb/qqM+QArSM+CG3htJWEtNIAJdrAHgObu9Dd2noZGAJPdNAieBUlo5p5Id7DStX3HY0na/LlojbOVHEL4TU5BOwBWL7BWC8Ni8P2ZZ53otdo2MIwhjGgXPFLhFID0DXrPMlPVTB6ym1nP7tohr2us+nviP3Y1Aq/520mnTlNDKGQAu02dK06+pmdxiHgDndRIGgj0FlYx6vFaeuvZTwnW1eeCzyPukoEm/XmO2BWQDW4BVLOS9Y7ujuk68pY1fwcc/MQK39SGqtNmt1PEdculnUPW/GXe4rJ/knutAJRsBuM9Xm6afdwBs8xlQKdMdLhdT9wTccNAZS/IKFucSYH+474gKhYA7ohDwn4BBwPxSCw2zgG8ZAua3amioAT5kE6gNlUCtelUCA0B9qEc09epVYRxStYRGYMIhVdGP6Yp+UDkFjmqLflg9BY7roUrrJUUqWEA4JZsh95KNEYVM0ao5b0WrZvei1ZQr2xkoauEyjaKWbv8l/AVfwtWs6ZksGgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNC0xNFQxNTozNjo1MSswMzowMFqJYXQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDQtMTRUMTU6MzY6NTArMDM6MDCNo9J8AAAAAElFTkSuQmCC',
  },
]

const DrugDoses = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      dataSource: ds.cloneWithRows(sections),
    }
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={(s, r) => <View key={`sep-${s}-${r}`} style={styles.separator} />}
      />
    )
  },

  _renderRow(row, s: number, r: number) {
    return (
      <ScrollView>
        <TouchableHighlight underlayColor='#EEE' onPress={() => {
          this.props.navigator.push(Router.DrugDosesSection(
            this.props.state, row.label, row.type
          ))
        }}>
          <View style={styles.section}>
            <Image style={styles.thumb} source={{uri: row.logo}} />
            <Text ref={`type-${s}-${r}`} style={styles.label}>
              {row.label}
            </Text>
            <Ionicons style={styles.next} name='chevron-right' />
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }
})

module.exports = DrugDoses
