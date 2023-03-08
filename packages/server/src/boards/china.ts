import { Block } from '../grids/blocks'
import { Start } from '../grids/start'
import { Board } from '.'

const start = new Start()
const shanghai = new Block('Shanghai', 500)
const beijing = new Block('Beijing', 500)
const guangzhou = new Block('Guangzhou', 450)
const shenzheng = new Block('Shenzheng', 450)
const suzhou = new Block('Suzhou', 400)
const hangzhou = new Block('Hangzhou', 400)
const nanchang = new Block('Nanchang', 350)
const jiujiang = new Block('Jiujiang', 350)

export class China extends Board {
  public grids = [
    start,
    shanghai,
    beijing,
    guangzhou,
    shenzheng,
    suzhou,
    hangzhou,
    nanchang,
    jiujiang
  ]

  public groups = [
    [start.tk],
    [shanghai.tk, beijing.tk],
    [guangzhou.tk, shenzheng.tk],
    [suzhou.tk, hangzhou.tk],
    [nanchang.tk, jiujiang.tk]
  ]
}
