import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Calendar,
  DollarSign,
  PieChart as PieChartIcon,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

// Updated colors to match teal/cyan theme
const COLORS = [
  "#0d9488",
  "#0891b2",
  "#06b6d4",
  "#22d3ee",
  "#67e8f9",
  "#cffafe",
];

const CATEGORIES = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Entertainment",
  "Other",
];

const Dashboard = () => {
  // State management remains the same
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [notification, setNotification] = useState(null);

  // All useEffect and function implementations remain exactly the same
  useEffect(() => {
    if (transactions.length > 0) {
      const total = transactions.reduce((sum, t) => sum + t.amount, 0);
      if (income && total > income * 0.9) {
        setNotification(
          "Warning: You're approaching your monthly budget limit!"
        );
      }
    }
  }, [transactions, income]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!amount || !date || !category) {
      setNotification("Please fill in all fields");
      return;
    }

    const newTransaction = {
      date,
      amount: parseFloat(amount),
      category,
      id: Date.now(),
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDate("");
    setCategory("");
    setNotification("Transaction added successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    setNotification("Transaction deleted");
    setTimeout(() => setNotification(null), 3000);
  };

  const formatAdviceText = (text) => {
    if (!text) return [];
    const paragraphs = text.split("\n").filter((p) => p.trim());
    return paragraphs.map((para) => {
      return para
        .replace(/[*\\]/g, "")
        .trim()
        .replace(/^[-•]/, "")
        .trim();
    });
  };

  const getAdvice = async () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    try {
      setAdvice("Loading...");
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `As a financial advisor, analyze my budget and provide specific advice. Monthly income: $${income}. Expenses: ${JSON.stringify(
                    transactions.map((t) => ({
                      category: t.category,
                      amount: t.amount,
                    }))
                  )}. Please provide clear, actionable advice for better budget management. Format your response as bullet points.`,
                },
              ],
            },
          ],
        }
      );

      let rawText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No advice received.";
      setAdvice(rawText);
    } catch (error) {
      console.error("Error fetching AI advice:", error);
      setAdvice("Error fetching advice. Please try again later.");
    }
  };

  const categoryData = transactions.reduce((acc, transaction) => {
    const found = acc.find((item) => item.name === transaction.category);
    if (found) {
      found.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, []);

  const getTrendData = () => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedTransactions.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push({ date, amount: curr.amount });
      }
      return acc;
    }, []);
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const remainingBudget = income ? income - totalExpenses : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in z-50">
            <AlertCircle className="text-teal-600" size={20} />
            <p className="text-gray-700">{notification}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
            Smart Budget Tracker
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="text-teal-600" size={24} />
                <h2 className="text-xl font-semibold">Budget Overview</h2>
              </div>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Enter Monthly Income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-xl font-bold text-red-500">
                      ${totalExpenses.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Remaining Budget</p>
                    <p className="text-xl font-bold text-teal-500">
                      ${remainingBudget.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-teal-600" size={24} />
                <h2 className="text-xl font-semibold">Add Transaction</h2>
              </div>
              <form onSubmit={addTransaction} className="space-y-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition transform hover:scale-105"
                >
                  Add Expense
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-teal-600" size={24} />
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-red-500 font-medium">
                        ${transaction.amount.toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">
                Expense Distribution
              </h2>
              <div className="flex justify-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
              <LineChart width={500} height={300} data={getTrendData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line type="monotone" dataKey="amount" stroke="#0d9488" />
              </LineChart>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">AI Budgeting Advice</h2>
              <button
                onClick={getAdvice}
                disabled={!income || transactions.length === 0}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition transform hover:scale-105 flex items-center gap-2"
              >
                {advice === "Loading..." ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                ) : null}
                Get AI Advice
              </button>
            </div>

            {advice && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {advice === "Loading..." ? (
                  <div className="flex items-center justify-center py-4">
                    <span className="text-gray-600">
                      Analyzing your budget...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formatAdviceText(advice).map((paragraph, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-teal-600 font-bold mt-1">•</span>
                        <p className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
