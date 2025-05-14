"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useColorTheme } from "@/lib/theme-context"

interface ThemePreviewProps {
  themeId?: string
  customColors?: {
    primary: string
    secondary: string
    accent: string
  } | null
}

export function ThemePreview({ themeId, customColors }: ThemePreviewProps) {
  const { getThemeById } = useColorTheme()
  const [previewStyles, setPreviewStyles] = useState<React.CSSProperties>({})
  const [theme, setTheme] = useState<any>(null)

  useEffect(() => {
    if (themeId) {
      const selectedTheme = getThemeById(themeId)
      if (selectedTheme) {
        setTheme(selectedTheme)
        setPreviewStyles({
          "--preview-primary": `hsl(${selectedTheme.colors.primary})`,
          "--preview-secondary": `hsl(${selectedTheme.colors.secondary})`,
          "--preview-accent": `hsl(${selectedTheme.colors.accent})`,
        } as React.CSSProperties)
      }
    } else if (customColors) {
      setTheme(null)
      setPreviewStyles({
        "--preview-primary": customColors.primary,
        "--preview-secondary": customColors.secondary,
        "--preview-accent": customColors.accent,
      } as React.CSSProperties)
    }
  }, [themeId, customColors, getThemeById])

  return (
    <div className="theme-preview" style={previewStyles}>
      {theme && (
        <div className="mb-4 p-3 bg-secondary/20 rounded-md border">
          <h3 className="font-medium text-sm">{theme.name}</h3>
          {theme.industry && (
            <Badge variant="outline" className="mt-1">
              {theme.industry}
            </Badge>
          )}
          {theme.description && <p className="text-xs text-muted-foreground mt-2">{theme.description}</p>}
        </div>
      )}

      <div className="preview-container">
        <div className="preview-header" style={{ backgroundColor: "var(--preview-primary)" }}>
          <div className="preview-logo">BusinessFy</div>
          <div className="preview-nav">
            <div className="preview-nav-item">Dashboard</div>
            <div className="preview-nav-item">Projects</div>
            <div className="preview-nav-item">Settings</div>
          </div>
          <div className="preview-actions">
            <div className="preview-avatar"></div>
          </div>
        </div>

        <div className="preview-content">
          <div className="preview-sidebar">
            <div className="preview-sidebar-item active">Dashboard</div>
            <div className="preview-sidebar-item">Analytics</div>
            <div className="preview-sidebar-item">Customers</div>
            <div className="preview-sidebar-item">Products</div>
            <div className="preview-sidebar-item">Settings</div>
          </div>

          <div className="preview-main">
            <h2 className="preview-title">Dashboard</h2>

            <div className="preview-cards">
              <div className="preview-card">
                <div className="preview-card-title">Total Sales</div>
                <div className="preview-card-value">$24,780</div>
                <div className="preview-card-change positive">+12.5%</div>
              </div>
              <div className="preview-card">
                <div className="preview-card-title">Customers</div>
                <div className="preview-card-value">1,429</div>
                <div className="preview-card-change positive">+5.2%</div>
              </div>
              <div className="preview-card">
                <div className="preview-card-title">Avg. Order</div>
                <div className="preview-card-value">$175</div>
                <div className="preview-card-change negative">-2.1%</div>
              </div>
            </div>

            <div className="preview-panel">
              <div className="preview-panel-header">
                <div className="preview-panel-title">Recent Orders</div>
                <button className="preview-button small">View All</button>
              </div>
              <div className="preview-table">
                <div className="preview-table-row header">
                  <div className="preview-table-cell">Order ID</div>
                  <div className="preview-table-cell">Customer</div>
                  <div className="preview-table-cell">Status</div>
                  <div className="preview-table-cell">Amount</div>
                </div>
                <div className="preview-table-row">
                  <div className="preview-table-cell">#1234</div>
                  <div className="preview-table-cell">John Doe</div>
                  <div className="preview-table-cell">
                    <span className="preview-status completed">Completed</span>
                  </div>
                  <div className="preview-table-cell">$129.99</div>
                </div>
                <div className="preview-table-row">
                  <div className="preview-table-cell">#1235</div>
                  <div className="preview-table-cell">Jane Smith</div>
                  <div className="preview-table-cell">
                    <span className="preview-status pending">Pending</span>
                  </div>
                  <div className="preview-table-cell">$89.99</div>
                </div>
              </div>
            </div>

            <div className="preview-actions-row">
              <button className="preview-button primary">Add New Order</button>
              <button className="preview-button secondary">Export Data</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .theme-preview {
          --preview-radius: 0.5rem;
          --preview-font: system-ui, sans-serif;
          font-family: var(--preview-font);
        }

        .preview-container {
          border: 1px solid #e2e8f0;
          border-radius: var(--preview-radius);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          font-size: 12px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          color: white;
        }

        .preview-logo {
          font-weight: bold;
          font-size: 14px;
        }

        .preview-nav {
          display: flex;
          gap: 1rem;
        }

        .preview-nav-item {
          opacity: 0.8;
        }

        .preview-nav-item:hover {
          opacity: 1;
        }

        .preview-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .preview-content {
          display: flex;
          min-height: 300px;
        }

        .preview-sidebar {
          width: 120px;
          background-color: #f8fafc;
          padding: 1rem 0;
          border-right: 1px solid #e2e8f0;
        }

        .preview-sidebar-item {
          padding: 0.5rem 1rem;
          font-size: 11px;
          color: #64748b;
          cursor: pointer;
        }

        .preview-sidebar-item:hover {
          background-color: #f1f5f9;
        }

        .preview-sidebar-item.active {
          background-color: var(--preview-secondary);
          color: var(--preview-primary);
          font-weight: 500;
        }

        .preview-main {
          flex: 1;
          padding: 1rem;
          background-color: #ffffff;
        }

        .preview-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .preview-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .preview-card {
          background-color: #f8fafc;
          border-radius: var(--preview-radius);
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .preview-card-title {
          font-size: 10px;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .preview-card-value {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .preview-card-change {
          font-size: 10px;
          margin-top: 0.25rem;
        }

        .preview-card-change.positive {
          color: #10b981;
        }

        .preview-card-change.negative {
          color: #ef4444;
        }

        .preview-panel {
          background-color: #f8fafc;
          border-radius: var(--preview-radius);
          border: 1px solid #e2e8f0;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .preview-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .preview-panel-title {
          font-weight: 500;
          font-size: 12px;
          color: #1e293b;
        }

        .preview-table {
          font-size: 10px;
        }

        .preview-table-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr 1fr;
          border-bottom: 1px solid #e2e8f0;
        }

        .preview-table-row.header {
          background-color: #f1f5f9;
          font-weight: 500;
        }

        .preview-table-cell {
          padding: 0.5rem 0.75rem;
          display: flex;
          align-items: center;
        }

        .preview-status {
          font-size: 9px;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
        }

        .preview-status.completed {
          background-color: #dcfce7;
          color: #15803d;
        }

        .preview-status.pending {
          background-color: #fef9c3;
          color: #854d0e;
        }

        .preview-actions-row {
          display: flex;
          gap: 0.5rem;
        }

        .preview-button {
          font-size: 11px;
          padding: 0.375rem 0.75rem;
          border-radius: var(--preview-radius);
          font-weight: 500;
          cursor: pointer;
        }

        .preview-button.small {
          font-size: 10px;
          padding: 0.25rem 0.5rem;
        }

        .preview-button.primary {
          background-color: var(--preview-primary);
          color: white;
          border: none;
        }

        .preview-button.secondary {
          background-color: white;
          color: var(--preview-primary);
          border: 1px solid var(--preview-primary);
        }
      `}</style>
    </div>
  )
}
