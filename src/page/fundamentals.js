import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { fundamentalsFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseTable } from 'components/index';
const Fundamentals = (props) => {
  const [from,setFrom]  = useState(null);
  const [tableType,setTableType] = useState('balance');
  // 提交表格查询
  const querySubmit = (e) => {
    setTableType(e?.table);
    props?.commonFunc?.getFundamentals(e);
  };
  useEffect(()=>{
    props?.commonFunc?.getAllSecurities()
      .then(res=>{
        const filterData = res?.result.map(item=>{
          item.name = item?.display_name;
          item.id = item?.code;
          return item;
        });
        fundamentalsFrom.push({
          title: '股票代码',
          fromType: 'select',
          name: 'code',
          selOption: filterData,
          placeholder: '请选股票代码',
          showSearch: true,
          rules: [{ required: true, message: '股票代码不能为空' }],
          options: {
            allowClear: true//是否显示清除框
          }
        });
        setFrom(fundamentalsFrom);
      });
  },[]);
  // borrowing_repayment: "852807680.0000"
  // cash_and_equivalents_at_end: ""
  // cash_equivalent_increase: "1369486208.0000"
  // cash_equivalents_at_beginning: ""
  // cash_from_bonds_issue: "1990000000.0000"
  // cash_from_borrowing: "245837664.0000"
  // cash_from_invest: ""
  // cash_from_mino_s_invest_sub: ""
  // code: "000002.XSHE"
  // dividend_interest_payment: "61224136.0000"
  // exchange_rate_change_effect: "287652.5625"
  // fix_intan_other_asset_acqui_cash: "8399804.0000"
  // fix_intan_other_asset_dispo_cash: "90296.0000"
  // goods_and_services_cash_paid: "1635482240.0000"
  // goods_sale_and_service_render_cash: "2283669504.0000"
  // handling_charges_and_commission: ""
  // id: "94.0000"
  // impawned_loan_net_increase: ""
  // interest_and_commission_cashin: ""
  // invest_cash_paid: "3900000.0000"
  // invest_proceeds: ""
  // invest_withdrawal_cash: "3235403.5000"
  // net_borrowing_from_central_bank: ""
  // net_borrowing_from_finance_co: ""
  // net_buyback: ""
  // net_cash_deal_subcompany: ""
  // net_cash_from_sub_company: ""
  // net_cash_received_from_reinsurance_business: ""
  // net_deal_trading_assets: ""
  // net_deposit_in_cb_and_ib: ""
  // net_deposit_increase: ""
  // net_finance_cash_flow: "1294965504.0000"
  // net_increase_in_placements: ""
  // net_insurer_deposit_investment: ""
  // net_invest_cash_flow: "-3726160.0000"
  // net_loan_and_advance_increase: ""
  // net_operate_cash_flow: "77959200.0000"
  // net_original_insurance_cash: ""
  // original_compensation_paid: ""
  // other_cash_from_invest_act: ""
  // other_cash_to_invest_act: "0.0000"
  // other_cashin_related_operate: "190154272.0000"
  // other_finance_act_cash: ""
  // other_finance_act_payment: ""
  // other_operate_cash_paid: "494265888.0000"
  // periodEnd: "2005-03-21"
  // periodStart: "2004-10-28"
  // policy_dividend_cash_paid: ""
  // proceeds_from_sub_to_mino_s: ""
  // pubDate: "2004-10-28"
  // reportId: "409000000.0000"
  // sourceFlag: "0.0000"
  // staff_behalf_paid: "84770752.0000"
  // statDate: "2004-09-30"
  // subtotal_finance_cash_inflow: "2237337600.0000"
  // subtotal_finance_cash_outflow: "942372096.0000"
  // subtotal_invest_cash_inflow: "8573644.0000"
  // subtotal_invest_cash_outflow: "12299804.0000"
  // subtotal_operate_cash_inflow: "2479989248.0000"
  // subtotal_operate_cash_outflow: "2402030080.0000"
  // tax_levy_refund: ""
  // tax_payments: "185864400.0000"
  const columns = {
    'balance': [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '100px'
    },{
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: '100px'
    }, {
      title: 'dividend_payable',
      dataIndex: 'dividend_payable',
      key: 'dividend_payable',
      width: '100px'
    },{
      title: 'accounts_payable',
      dataIndex: 'accounts_payable',
      key: 'accounts_payable'
    },{
      title: 'advance_payment',
      dataIndex: 'advance_payment',
      key: 'advance_payment'
    },{
      title: 'capital_reserve_fund',
      dataIndex: 'capital_reserve_fund',
      key: 'capital_reserve_fund'
    },{
      title: 'cash_equivalents',
      dataIndex: 'cash_equivalents',
      key: 'cash_equivalents'
    },{
      title: 'constru_in_process',
      dataIndex: 'constru_in_process',
      key: 'constru_in_process'
    },{
      title: 'dividend_payable',
      dataIndex: 'dividend_payable',
      key: 'dividend_payable'
    },{
      title: 'fixed_assets_liquidation',
      dataIndex: 'fixed_assets_liquidation',
      key: 'fixed_assets_liquidation'
    },{
      title: 'long_deferred_expense',
      dataIndex: 'long_deferred_expense',
      key: 'long_deferred_expense'
    },{
      title: 'longterm_account_payable',
      dataIndex: 'longterm_account_payable',
      key: 'longterm_account_payable'
    },{
      title: 'longterm_equity_invest',
      dataIndex: 'longterm_equity_invest',
      key: 'longterm_equity_invest'
    },{
      title: 'other_payable',
      dataIndex: 'other_payable',
      key: 'other_payable'
    },{
      title: 'paidin_capital',
      dataIndex: 'paidin_capital',
      key: 'paidin_capital'
    },{
      title: 'periodEnd',
      dataIndex: 'periodEnd',
      key: 'periodEnd'
    },{
      title: 'periodStart',
      dataIndex: 'periodStart',
      key: 'periodStart'
    },{
      title: 'pubDate',
      dataIndex: 'pubDate',
      key: 'pubDate'
    },{
      title: 'retained_profit',
      dataIndex: 'retained_profit',
      key: 'retained_profit'
    },{
      title: 'salaries_payable',
      dataIndex: 'salaries_payable',
      key: 'salaries_payable'
    },{
      title: 'surplus_reserve_fund',
      dataIndex: 'surplus_reserve_fund',
      key: 'surplus_reserve_fund'
    },{
      title: 'taxs_payable',
      dataIndex: 'taxs_payable',
      key: 'taxs_payable'
    },{
      title: 'total_assets',
      dataIndex: 'total_assets',
      key: 'total_assets'
    },{
      title: 'total_current_assets',
      dataIndex: 'total_current_assets',
      key: 'total_current_assets'
    },{
      title: 'total_current_liability',
      dataIndex: 'total_current_liability',
      key: 'total_current_liability'
    },{
      title: 'total_liability',
      dataIndex: 'total_liability',
      key: 'total_liability'
    },{
      title: 'total_non_current_assets',
      dataIndex: 'total_non_current_assets',
      key: 'total_non_current_assets'
    },{
      title: 'total_non_current_liability',
      dataIndex: 'total_non_current_liability',
      key: 'total_non_current_liability'
    },{
      title: 'total_owner_equities',
      dataIndex: 'total_owner_equities',
      key: 'total_owner_equities'
    },{
      title: 'trading_assets',
      dataIndex: 'trading_assets',
      key: 'trading_assets'
    }],
    'income': [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '100px'
    },{
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: '100px'
    }, {
      title: 'pubDate',
      dataIndex: 'pubDate',
      key: 'pubDate',
      width: '100px'
    },{
      title: 'statDate',
      dataIndex: 'statDate',
      key: 'statDate'
    },{
      title: 'periodStart',
      dataIndex: 'periodStart',
      key: 'periodStart'
    },{
      title: 'periodEnd',
      dataIndex: 'periodEnd',
      key: 'periodEnd'
    },{
      title: 'total_operating_revenue',
      dataIndex: 'total_operating_revenue',
      key: 'total_operating_revenue'
    },{
      title: 'reportId',
      dataIndex: 'reportId',
      key: 'reportId'
    },{
      title: 'operating_revenue',
      dataIndex: 'operating_revenue',
      key: 'operating_revenue'
    },{
      title: 'interest_income',
      dataIndex: 'interest_income',
      key: 'interest_income'
    },{
      title: 'premiums_earned',
      dataIndex: 'premiums_earned',
      key: 'premiums_earned'
    },{
      title: 'commission_income',
      dataIndex: 'commission_income',
      key: 'commission_income'
    },{
      title: 'total_operating_cost',
      dataIndex: 'total_operating_cost',
      key: 'total_operating_cost'
    },{
      title: 'operating_cost',
      dataIndex: 'operating_cost',
      key: 'operating_cost'
    },{
      title: 'interest_expense',
      dataIndex: 'interest_expense',
      key: 'interest_expense'
    },{
      title: 'commission_expense',
      dataIndex: 'commission_expense',
      key: 'commission_expense'
    },{
      title: 'refunded_premiums',
      dataIndex: 'refunded_premiums',
      key: 'refunded_premiums'
    },{
      title: 'net_pay_insurance_claims',
      dataIndex: 'net_pay_insurance_claims',
      key: 'net_pay_insurance_claims'
    },{
      title: 'withdraw_insurance_contract_reserve',
      dataIndex: 'withdraw_insurance_contract_reserve',
      key: 'withdraw_insurance_contract_reserve'
    },{
      title: 'policy_dividend_payout',
      dataIndex: 'policy_dividend_payout',
      key: 'policy_dividend_payout'
    },{
      title: 'reinsurance_cost',
      dataIndex: 'reinsurance_cost',
      key: 'reinsurance_cost'
    },{
      title: 'operating_tax_surcharges',
      dataIndex: 'operating_tax_surcharges',
      key: 'operating_tax_surcharges'
    },{
      title: 'sale_expense',
      dataIndex: 'sale_expense',
      key: 'sale_expense'
    },{
      title: 'administration_expense',
      dataIndex: 'administration_expense',
      key: 'administration_expense'
    },{
      title: 'financial_expense',
      dataIndex: 'financial_expense',
      key: 'financial_expense'
    },{
      title: 'asset_impairment_loss',
      dataIndex: 'asset_impairment_loss',
      key: 'asset_impairment_loss'
    },{
      title: 'fair_value_variable_income',
      dataIndex: 'fair_value_variable_income',
      key: 'fair_value_variable_income'
    },{
      title: 'investment_income',
      dataIndex: 'investment_income',
      key: 'investment_income'
    },{
      title: 'invest_income_associates',
      dataIndex: 'invest_income_associates',
      key: 'invest_income_associates'
    },{
      title: 'exchange_income',
      dataIndex: 'exchange_income',
      key: 'exchange_income'
    },{
      title: 'operating_profit',
      dataIndex: 'operating_profit',
      key: 'operating_profit'
    },{
      title: 'non_operating_revenue',
      dataIndex: 'non_operating_revenue',
      key: 'non_operating_revenue'
    },{
      title: 'non_operating_expense',
      dataIndex: 'non_operating_expense',
      key: 'non_operating_expense'
    },{
      title: 'disposal_loss_non_current_liability',
      dataIndex: 'disposal_loss_non_current_liability',
      key: 'disposal_loss_non_current_liability'
    },{
      title: 'total_profit',
      dataIndex: 'total_profit',
      key: 'total_profit'
    },{
      title: 'income_tax_expense',
      dataIndex: 'income_tax_expense',
      key: 'income_tax_expense'
    },{
      title: 'net_profit',
      dataIndex: 'net_profit',
      key: 'net_profit'
    },{
      title: 'np_parent_company_owners',
      dataIndex: 'np_parent_company_owners',
      key: 'np_parent_company_owners'
    },{
      title: 'minority_profit',
      dataIndex: 'minority_profit',
      key: 'minority_profit'
    },{
      title: 'basic_eps',
      dataIndex: 'basic_eps',
      key: 'basic_eps'
    },{
      title: 'diluted_eps',
      dataIndex: 'diluted_eps',
      key: 'diluted_eps'
    },{
      title: 'other_composite_income',
      dataIndex: 'other_composite_income',
      key: 'other_composite_income'
    },{
      title: 'total_composite_income',
      dataIndex: 'total_composite_income',
      key: 'total_composite_income'
    },{
      title: 'ci_parent_company_owners',
      dataIndex: 'ci_parent_company_owners',
      key: 'ci_parent_company_owners'
    },{
      title: 'ci_minority_owners',
      dataIndex: 'ci_minority_owners',
      key: 'ci_minority_owners'
    },{
      title: 'sourceFlag',
      dataIndex: 'sourceFlag',
      key: 'sourceFlag'
    }],
    'cash_flow': [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '100px'
    },{
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: '100px'
    }, {
      title: 'borrowing_repayment',
      dataIndex: 'borrowing_repayment',
      key: 'borrowing_repayment',
      width: '100px'
    },{
      title: 'cash_equivalent_increase',
      dataIndex: 'cash_equivalent_increase',
      key: 'cash_equivalent_increase'
    },{
      title: 'cash_from_bonds_issue',
      dataIndex: 'cash_from_bonds_issue',
      key: 'cash_from_bonds_issue'
    },{
      title: 'cash_from_borrowing',
      dataIndex: 'cash_from_borrowing',
      key: 'cash_from_borrowing'
    },{
      title: 'dividend_interest_payment',
      dataIndex: 'dividend_interest_payment',
      key: 'dividend_interest_payment'
    },{
      title: 'exchange_rate_change_effect',
      dataIndex: 'exchange_rate_change_effect',
      key: 'exchange_rate_change_effect'
    },{
      title: 'fix_intan_other_asset_acqui_cash',
      dataIndex: 'fix_intan_other_asset_acqui_cash',
      key: 'fix_intan_other_asset_acqui_cash'
    },{
      title: 'fix_intan_other_asset_dispo_cash',
      dataIndex: 'fix_intan_other_asset_dispo_cash',
      key: 'fix_intan_other_asset_dispo_cash'
    },{
      title: 'goods_and_services_cash_paid',
      dataIndex: 'goods_and_services_cash_paid',
      key: 'goods_and_services_cash_paid'
    },{
      title: 'goods_sale_and_service_render_cash',
      dataIndex: 'goods_sale_and_service_render_cash',
      key: 'goods_sale_and_service_render_cash'
    },{
      title: 'invest_cash_paid',
      dataIndex: 'invest_cash_paid',
      key: 'invest_cash_paid'
    },{
      title: 'net_finance_cash_flow',
      dataIndex: 'net_finance_cash_flow',
      key: 'net_finance_cash_flow'
    },{
      title: 'net_invest_cash_flow',
      dataIndex: 'net_invest_cash_flow',
      key: 'net_invest_cash_flow'
    },{
      title: 'net_operate_cash_flow',
      dataIndex: 'net_operate_cash_flow',
      key: 'net_operate_cash_flow'
    },{
      title: 'other_cash_to_invest_act',
      dataIndex: 'other_cash_to_invest_act',
      key: 'other_cash_to_invest_act'
    },{
      title: 'other_operate_cash_paid',
      dataIndex: 'other_operate_cash_paid',
      key: 'other_operate_cash_paid'
    },{
      title: 'statDate',
      dataIndex: 'statDate',
      key: 'statDate'
    },{
      title: 'pubDate',
      dataIndex: 'pubDate',
      key: 'pubDate'
    },{
      title: 'subtotal_finance_cash_inflow',
      dataIndex: 'subtotal_finance_cash_inflow',
      key: 'subtotal_finance_cash_inflow'
    },{
      title: 'subtotal_finance_cash_outflow',
      dataIndex: 'subtotal_finance_cash_outflow',
      key: 'subtotal_finance_cash_outflow'
    },{
      title: 'subtotal_operate_cash_inflow',
      dataIndex: 'subtotal_operate_cash_inflow',
      key: 'subtotal_operate_cash_inflow'
    },{
      title: 'subtotal_invest_cash_outflow',
      dataIndex: 'subtotal_invest_cash_outflow',
      key: 'subtotal_invest_cash_outflow'
    },{
      title: 'subtotal_operate_cash_inflow',
      dataIndex: 'subtotal_operate_cash_inflow',
      key: 'subtotal_operate_cash_inflow'
    },{
      title: 'subtotal_operate_cash_outflow',
      dataIndex: 'subtotal_operate_cash_outflow',
      key: 'subtotal_operate_cash_outflow'
    },{
      title: 'tax_payments',
      dataIndex: 'tax_payments',
      key: 'tax_payments'
    }]
  };
  return (
    <div className="list">
      {head('股票收益列表')}
      {
        from && <BaseTable formObj={from} querySubmit={querySubmit} dataSource={props?.fundamentalsList} columns={columns[tableType]}  />
      }
    </div>
  );
};
Fundamentals.propTypes = {
  commonFunc: PropTypes.object,
  fundamentalsList: PropTypes.arrayOf(Object),
};
export default connect(state => ({
  fundamentalsList: state?.common?.fundamentalsList
}), dispatch => {
  return{
    commonFunc:bindActionCreators(commonAction, dispatch)
  };
})(Fundamentals);