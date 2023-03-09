import { Land } from '../grids/lands'
import { Start } from '../grids/start'
import { Jail } from '../grids/jail'
import { Board } from '.'

const start = new Start()
const jail = new Jail()
const shanghai = new Land('Shanghai', 500)
const beijing = new Land('Beijing', 500)
const guangzhou = new Land('Guangzhou', 450)
const shenzheng = new Land('Shenzheng', 450)
const suzhou = new Land('Suzhou', 400)
const hangzhou = new Land('Hangzhou', 400)
const nanchang = new Land('Nanchang', 350)
const jiujiang = new Land('Jiujiang', 350)

export class China extends Board {
  public grids = [
    start,
    shanghai,
    beijing,
    jail,
    guangzhou,
    shenzheng,
    suzhou,
    hangzhou,
    nanchang,
    jiujiang
  ]

  public groups = [
    [start.tk],
    [jail.tk],
    [shanghai.tk, beijing.tk],
    [guangzhou.tk, shenzheng.tk],
    [suzhou.tk, hangzhou.tk],
    [nanchang.tk, jiujiang.tk]
  ]
}
