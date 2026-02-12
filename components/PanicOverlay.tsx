
import React from 'react';

const PanicOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-auto p-4 font-mono text-[10px]">
      <div className="flex justify-between border-b-2 border-black pb-2 mb-4">
        <h1 className="text-lg font-bold">2026年Q1季度全球业务增长与风险对冲分析报告 (草案)</h1>
        <div className="text-right">机密：内部传阅</div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="border border-black p-2 h-40 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <p className="mb-2 font-bold">KPI Matrix {i}</p>
              <div className="flex items-end gap-1 h-20">
                {[40, 70, 30, 90, 50, 80].map((h, j) => (
                  <div key={j} className="w-4 bg-blue-900" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <table className="w-full border-collapse border border-black mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-1">Index ID</th>
            <th className="border border-black p-1">Core Metrics</th>
            <th className="border border-black p-1">Variance %</th>
            <th className="border border-black p-1">Actionable Insight</th>
            <th className="border border-black p-1">Owner</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 25 }).map((_, i) => (
            <tr key={i}>
              <td className="border border-black p-1">#REF!_{2000 + i}</td>
              <td className="border border-black p-1">Operational Efficiency Optimization</td>
              <td className="border border-black p-1">+{ (Math.random() * 10).toFixed(2) }%</td>
              <td className="border border-black p-1">Synthesize cross-platform synergies to leverage incremental ROI.</td>
              <td className="border border-black p-1">STAKEHOLDER_{i}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-4">
        <p className="font-bold">摘要：</p>
        <p>
          通过对现有业务流的解构与重组，我们发现协同效应在去中心化架构下的边际效用递减。
          为了实现可持续性增长，必须在下一阶段强化闭环生态的渗透率，同时通过ABC模型进行成本坍缩。
          预计在Q2结束前，我们能完成第一波“降本增效”的战略闭环。
        </p>
      </div>
    </div>
  );
};

export default PanicOverlay;
