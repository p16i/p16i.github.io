---
path: "/blog/2021-krr-gps"
date: "2021-02-20"
title: "Kernel Ridge Regression and Gaussian Processes"
---
## Background: Linear Regression

Consider that we have  a dataset $\mathcal{D} = \{ (\mathbf x_i, y_i)\}_{i=1}^n$. We assume that 


$$
y = \mathbf v^T \mathbf x + \epsilon,
$$


where $\mathbf v$ is the true function and  $\epsilon \sim \mathcal{N}(0, \sigma^2_\epsilon)$. Then, we can construct the likelihood


$$
l(\mathcal D; \mathbf w) := p(\mathcal D | \mathbf w) =\prod_{i=1}^n p(y_i | \mathbf x_i; \mathbf w).
$$


Because $y \sim \mathcal{N}(\mathbf w^T\mathbf x, \sigma^2)$. The expected (empirical) log likelihood is the squared loss:


$$
\begin{aligned}
\mathcal{L}(\mathbf w) &= \frac{1}{n} \sum_{i=1}^n  (y_i - \mathbf w^T \mathbf x_i)^2 \\
&= \frac{1}{n} \sum_{i=1}^n (\mathbf w^T \mathbf x_i \mathbf x_i^T \mathbf w - 2\mathbf w^T \mathbf x_i y_i + y_i^2)
\end{aligned}
$$


Taking derivative w.r.t $\mathbf w$ yields


$$
\nabla_\mathbf w \mathcal{L}(\mathbf w) = \frac{1}{n} \sum_{i=1}^n 2 \mathbf x_i \mathbf x_i^T \mathbf w - 2 \mathbf x_i y_i.
$$


Let $\mathbf X \in \reals^{n\times d} = (\mathbf x_1, \dots, \mathbf x_n)^T$ and $\mathbf y = (y_1, \dots, y_n)$ . The derivative is 


$$
\nabla_\mathbf w \mathcal{L}(\mathbf w) = \frac{1}{n} \bigg( 2\mathbf X^T \mathbf X \mathbf w - 2 \mathbf X^T \mathbf y \bigg).
$$


Setting the derivative to zero yields


$$
\mathbf w = \big(\mathbf X^T \mathbf X\big)^{-1} \mathbf X^T \mathbf y.
$$


For ridge regression, which has an additional term (called regularizer), $\lambda \| \mathbf w \|_2^2$.  The solution is 


$$
\mathbf w = (\mathbf X^T \mathbf X + \lambda I_d )^{-1} \mathbf X^T \mathbf y.
$$


## Nonlinear Regression with Kernel : Kernel Ridge Regression

Instead of using $\mathbf x \in \mathcal{X} \subseteq  \reals^d$, we can consider transforming $\mathbf x$  into some feature space first. More precisely, we would like to find $\phi: \mathcal{X} \rightarrow \mathcal{H}$ . We then assume a model 


$$
y = \mathbf w^T \phi(\mathbf x) + \epsilon.
$$


Hence, the solution can be founded using the regularized least squared equation:


$$
\mathbf w = (\phi(\mathbf X)^T \phi(\mathbf X) + \lambda I_h)^{-1} \phi(\mathbf X)^T \mathbf y.
$$


However, finding such $\phi(\mathbf x) \mapsto \mathcal{H}$ is not trivial. To overcome this, we instead find $\phi(\cdot)$ implicity through a kernel function $k: \mathcal X \times \mathcal X \rightarrow \reals_+$. Under [technical conditions](https://en.wikipedia.org/wiki/Positive-definite_kernel#Connection_with_reproducing_kernel_Hilbert_spaces_and_feature_maps) on $k$, it is known that 


$$
\begin{aligned}
k(\mathbf x_i, \mathbf x_j) &= \langle \phi( \mathbf x_i) , \phi( \mathbf x_j)\rangle_\mathcal{H} \\
&= \phi(\mathbf x_i)^T \phi(\mathbf x_j).
\end{aligned}
$$


Consider a test sample $\mathbf x^*$ . The prediction is 


$$
\begin{aligned}
f(\mathbf x^*) &= \phi(\mathbf x^*)^T\bigg( \phi(\mathbf X)\phi(\mathbf X) + \lambda I_h \bigg)^{-1} \phi(\mathbf X)^T \mathbf y \\
&= \phi(\mathbf x^*)^T\bigg( \phi(\mathbf X)^T\phi(\mathbf X)+ \lambda I_h \bigg)^{-1} \phi(\mathbf X)^T \bigg( \phi(\mathbf X)\phi(\mathbf X)^T + \lambda I_h \bigg) \bigg( \phi(\mathbf X)\phi(\mathbf X)^T + \lambda I_h \bigg)^{-1}  \mathbf y \\
&= \phi(\mathbf x^*)^T\bigg( \phi(\mathbf X)^T\phi(\mathbf X)+ \lambda I_h \bigg)^{-1}  \bigg( \phi(\mathbf X)^T\phi(\mathbf X)\phi(\mathbf X)^T + \lambda \phi(\mathbf X)^T \bigg) \bigg( \phi(\mathbf X)\phi(\mathbf X)^T + \lambda I_h \bigg)^{-1}  \mathbf y \\
&= \phi(\mathbf x^*)^T\bigg( \phi(\mathbf X)^T\phi(\mathbf X)+ \lambda I_h \bigg)^{-1}  \bigg( \phi(\mathbf X)^T\phi(\mathbf X) + \lambda I_h \bigg) \phi(\mathbf X)^T \bigg( \phi(\mathbf X)\phi(\mathbf X)^T + \lambda I_h \bigg)^{-1}  \mathbf y \\
&= \phi(\mathbf x^*)^T \phi(\mathbf X)^T \bigg( \phi(\mathbf X)\phi(\mathbf X)^T + \lambda I_h \bigg)^{-1}   \mathbf y
\end{aligned}
$$


Define $k_{\mathbf X}(\mathbf x^*):= \phi(\mathbf X) \phi(\mathbf x^*)$ and $\mathbf K =  \phi(\mathbf{X})\phi(\mathbf{X})^T$. From [the representer theorem](https://en.wikipedia.org/wiki/Representer_theorem), we also know that the solution $\mathbf w$  is the span of $k(\cdot, \mathbf x_i) \in \mathcal{H}, \forall i = [1, n]$. More precisely, it is in the following form:


$$
\mathbf w = \sum_{i=1}^n \alpha_i  k(\cdot, \mathbf x_i).
$$


Therefore, in other words, we have 


$$
f(\mathbf x^*) = k_\mathbf X(\mathbf x^*)^T\underbrace{(\mathbf K + \lambda I_h)^{-1} \mathbf y}_{=: \alpha^*},
$$


where $\alpha^* = (\alpha_1, \dots, \alpha_n)$.

<div align="center">
  <img src="https://i.imgur.com/0Spt1bE.png"/>
  <div style="color: gray">Fig. 1: Prediction from linear regression, kernel ridge regression, and Gaussian processes.</div>
</div>

## Gaussian Processes: Bayesian Kernel Regression

From Bayes' rule, we know that 


$$
p(\mathbf w | \mathcal D) = \frac{p(\mathcal D| \mathbf w) p(\mathbf w)}{p(\mathcal D)}.
$$


In general, $p(\mathcal D) = \int p(\mathcal D | \mathbf w) p(\mathbf w) d\mathbf w$ is intractable. However, if we choose $p(\mathbf w)$  appropriately,   the term can be computed analytically. In particular, in the case of regression (i.e. Gaussian likelihood), we can choose  $p(\mathbf w) = \mathcal{N}(0, \sigma_w^2 I)$. Because  Gaussian distributions are close under multiplication, the posterior distribution is also a Gaussian distribution. In this case, we have


$$
\mathbf w \sim \mathcal {N}(\mu', \Sigma'),
$$


where $\Sigma' = (\sigma^{-2}_\epsilon\mathbf X^T \mathbf X + \sigma^{-2}_wI_d)^{-1}$ and $\mu' = \sigma^{-2}_\epsilon \Sigma' \mathbf X \mathbf y$.

Let's consider using the feature map $\phi : \mathcal X \rightarrow \mathcal H$, we can rewrite $\mu' ,\Sigma'$  as 


$$
\begin{aligned}
\Sigma' &= \bigg( \sigma^{-2}_\epsilon \phi(\mathbf X)^T \phi(\mathbf X) + I_h \bigg)^{-1} \\
\mu ' &= \sigma^{-2}_\epsilon \Sigma'\phi(\mathbf X)^T \mathbf y.
\end{aligned}
$$


For linear regression with Gaussian prior (i.e. ridge regression), the predictive mean and variance are


$$
\begin{aligned}
\mu_{y_*} &= \mathbf x_*^T \mu'  \\
\sigma^2_{y_*} &= \sigma^2_\epsilon + \mathbf x_*^T \Sigma' \mathbf x_*
\end{aligned}
$$


Therefore, we have 


$$
\begin{aligned}
\mu_{y_*} &= \phi(\mathbf x_*)^T \mu' \\
&= \sigma^{-2}_\epsilon \phi(\mathbf x_*)^T \Sigma'\phi(\mathbf X) \mathbf y  \\
&= \sigma^{-2}_\epsilon  \phi(\mathbf x_*)^T \bigg( \sigma^{-2}_\epsilon  \phi(\mathbf X)^T \phi(\mathbf X) + I_h \bigg)^{-1}  \phi(\mathbf X)^T 
\bigg( \sigma^{-2}_\epsilon  \phi(\mathbf X) \phi(\mathbf X)^T + I_h \bigg)  
\bigg( \sigma^{-2}_\epsilon  \phi(\mathbf X) \phi(\mathbf X)^T + I_h\bigg)^{-1}   \mathbf  y \\
&= \sigma^{-2}_\epsilon  \phi(\mathbf x_*)^T \phi(\mathbf X)^T
\bigg( \sigma^{-2}_\epsilon  \phi(\mathbf X) \phi(\mathbf X)^T + I_h \bigg)^{-1}   \mathbf  y  \\
&= \phi(\mathbf x_*)^T  \phi(\mathbf X)^T
\bigg( \phi(\mathbf X) \phi(\mathbf X)^T + \sigma^2_\epsilon  I_h\bigg)^{-1}   \mathbf  y 
\\
&= k_\mathbf X(\mathbf x_*)  (\mathbf K + \sigma^2_\epsilon I_h)^{-1} \mathbf  y
\end{aligned}
$$


Similarly, using the [Sherman-Morrison-Woodbury](https://en.wikipedia.org/wiki/Sherman–Morrison_formula) formula, we have


$$
\begin{aligned}
\phi(\mathbf x_*)^T \Sigma' \phi(\mathbf x_*) &= \phi(\mathbf x_*)^T \bigg( \sigma^{-2}_\epsilon  \phi(\mathbf X)^T \phi(\mathbf X) + I_h \bigg)^{-1}  \phi(\mathbf x_*)\\
&= \phi(\mathbf x_*)^T \bigg( I_h - I_h \sigma^{-2}_\epsilon  \phi(\mathbf X)^T \bigg( I_h + \sigma^{-2}_\epsilon \phi(\mathbf X) \phi(\mathbf X)^T \bigg)^{-1} \phi(\mathbf X) \bigg) \phi(\mathbf x_*) \\
&= \phi(\mathbf x_*)^T\phi(\mathbf x_*) - \sigma^{-2}_\epsilon \phi(\mathbf x_*)^T \phi(\mathbf X)^T \bigg( I_h + \sigma^{-2}_\epsilon \phi(\mathbf X) \phi(\mathbf X)^T \bigg)^{-1} \phi(\mathbf X) \phi(\mathbf x_*) \\
&= k(\mathbf x_*, \mathbf x_*) - \sigma^{-2}_\epsilon  k_{\mathbf X}(\mathbf x_*)^T\bigg( I_h+ \sigma^{-2}_\epsilon \mathbf K\bigg)^{-1} k_{\mathbf X}(\mathbf x_*) \\
&= k(\mathbf x_*, \mathbf x_*) -  k_{\mathbf X}(\mathbf x_*)^T\bigg( \sigma^2_\epsilon I_h+ \mathbf K\bigg)^{-1} k_{\mathbf X}(\mathbf x_*).
\end{aligned}
$$


In summary, we have


$$
\begin{aligned}
p(y_*| \mathbf x_*, \mathcal D) = \mathcal N\bigg( k_\mathbf X(\mathbf x_*)  (\mathbf K + \sigma^2_\epsilon I_h)^{-1} \mathbf  y , k(\mathbf x_*, \mathbf x_*) -  k_{\mathbf X}(\mathbf x_*)^T\bigg( \sigma^2_\epsilon I_h+ \mathbf K\bigg)^{-1} k_{\mathbf X}(\mathbf x_*) \bigg).
\end{aligned}
$$

<div align="center">
  <img src="https://i.imgur.com/FuE9FEZ.png"/>
  <div style="color: gray">Fig. 2: linear regression and Gaussian processes trained with datasets with different sizes.</div>
</div>


## References

These are materials I consulted while writing this article:

- [Tzu-Kuo Huang's A Technical Introduction to Gaussian Process Regression](http://ntur.lib.ntu.edu.tw/bitstream/246246/20060927122912664791/1/gpr.pdf)
- [Chuong B. Do's Gaussian Processes](https://see.stanford.edu/materials/aimlcs229/cs229-gp.pdf)

Figures are maded using [Google Colab](https://colab.research.google.com/drive/1UkCSyjtML7Kr_vFNNd_gcGknQp2FFnvo).